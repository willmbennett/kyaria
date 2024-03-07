import { NextResponse, NextRequest } from 'next/server';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import puppeteer from 'puppeteer';
import { XMLParser } from 'fast-xml-parser';
import { transformDiffBotApiResponse } from '../../../board/job-helper';
import { createJobAction } from '../../../jobs/_action';
import { roleOptions } from '../../../profile/profile-helper';


const rssFeedList = roleOptions.map(role => (
    {
        role: role,
        rssFeed: `https://rss.indeed.com/rss?q=${encodeURIComponent(role)}`
    }
))
/*
const rssFeedList = [
    {
        role: 'Financial Analyst',
        rssFeed: `https://rss.indeed.com/rss?q=${encodeURIComponent('Financial Analyst')}`
    }
]
*/
export async function fetchWithRetry(url: string, options: any, maxRetries: number = 5): Promise<any> {
    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            const fetchResponse = await fetch(url, options);

            // Check for HTTP-level errors
            if (!fetchResponse.ok) {
                throw new Error(`HTTP Error: ${fetchResponse.status}`);
            }

            const jsonResponse = await fetchResponse.json();

            // Check for API-level errors
            if ('errorCode' in jsonResponse) {
                throw new Error(`API Error: ${jsonResponse.errorCode} - ${jsonResponse.error}`);
            }

            return jsonResponse;
        } catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} - Fetch Error: ${error}`);

            // Decide whether to retry based on the type of error
            if (attempts < maxRetries && shouldRetry(error)) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
            } else {
                throw error; // Throw the error if no more retries or should not retry
            }
        }
    }
}

// A helper function to determine if the error should trigger a retry
function shouldRetry(error: any): boolean {
    // Here you can add logic for which errors should trigger a retry
    // For example, you might want to retry on certain HTTP errors or API errors
    const retryableErrors = ['500', '403', '429']; // Example: Retry on server error, forbidden, and too many requests
    return retryableErrors.some(errCode => error.message.includes(errCode));
}



async function fetchFeedWithPuppeteer(feed: string) {
  //console.log(`Starting to fetch the feed: ${feed}`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(feed, { waitUntil: 'networkidle0', timeout: 60000 });
    const rssData = await page.content();
    await browser.close();
  //console.log(`Completed fetching the feed: ${feed}`);
    return rssData;
}

export async function POST() {
  //console.log('Starting the POST request processing');

    const session = await getServerSession(authOptions);

    if (!session) {
        console.warn('No session found, redirecting to signin');
        return redirect('/auth/signin');
    }

  //console.log('RSS feed list:');
  //console.log(rssFeedList)
    let linkList: string[] = [];
    let jobsInserted = 0;
    const parser = new XMLParser();

    try {
        for (const feedObj of rssFeedList) {
            const feed = feedObj.rssFeed;
            const role = feedObj.role;

          //console.log(`Fetching RSS feed for role: ${role}`);

            let rssData;
            try {
                rssData = await fetchFeedWithPuppeteer(feed);
            } catch (fetchError) {
                console.error(`Error fetching the feed: ${feed}`, fetchError);
                continue;
            }

          //console.log(`Parsing the RSS data from: ${feed}`);
            let rssObj;
            try {
                rssObj = parser.parse(rssData);
            } catch (parseError) {
                console.error(`Error parsing the RSS data from: ${feed}`, parseError);
                continue;
            }

            const rssContent = rssObj?.html?.head?.body?.pre;
            if (!rssContent) {
                console.warn(`No RSS content found for feed: ${feed}`);
                continue;
            }

            let actualRssObj;
            try {
                actualRssObj = parser.parse(rssContent);
            } catch (parseError) {
                console.error(`Error parsing the actual RSS content from: ${feed}`, parseError);
                continue;
            }

            const links = actualRssObj?.rss?.channel?.item?.map((item: any) => item.link) || [];
            linkList = linkList.concat(links);
          //console.log(`Extracted ${links.length} links from feed: ${feed}`);
        }

      //console.log(`Processing ${linkList.length} links to scrape job data`);
        for (const link of linkList) {
          //console.log(`Processing job link: ${link}`);
            try {
                const apiUrl = `https://api.diffbot.com/v3/analyze?url=${encodeURIComponent(link)}&token=${process.env.DIFFBOT_API_KEY}`;
              //console.log(`Diffbot API URL: ${apiUrl}`);

                const options = {
                    method: 'GET',
                    headers: { accept: 'application/json' },
                };

                const data = await fetchWithRetry(apiUrl, options);
              //console.log('Data fetched successfully:', data);
                const transformedResponse = transformDiffBotApiResponse(data, link);
              //console.log('------Transformed Response------')
              //console.log(JSON.stringify(transformedResponse))
                const jobId = await createJobAction(transformedResponse, '/');
                if (jobId) {
                  //console.log(`Added Job with ID: ${jobId}`);
                    jobsInserted++;
                }
            } catch (jobError) {
                console.error(`Error processing the job from link: ${link}`, jobError);
            }
        }

      //console.log(`Processed ${linkList.length} links and added ${jobsInserted} jobs.`);
        return NextResponse.json({ linksFound: linkList.length, jobsAdded: jobsInserted }, { status: 200 });

    } catch (error) {
        console.error('Unexpected error occurred:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}