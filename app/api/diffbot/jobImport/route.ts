import { NextResponse, type NextRequest } from 'next/server'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import { Job } from '../../../board/job-helper';
import { createJob } from '../../../../lib/job-db';

function transformDiffBotApiResponse(apiResponse: any): Job {
    const jobData = apiResponse;

    const transformedJob: Job = {
        jobTitle: jobData.name,
        link: `https://${jobData.origin}`,
        diffbotUri: jobData.diffbotUri,
        company: jobData.employer?.name,
        companyDiffbotUri: jobData.employer?.diffbotUri,
        location: jobData.locations?.address,
        remote: jobData.remote.str,
        aboutCompany: jobData.aboutCompany,
        jobDescription: jobData.text,
        qualifications: jobData.requirements,
        responsibilities: jobData.tasks,
        createdAt: new Date(jobData.date.timestamp),
        updatedAt: new Date(jobData.date.timestamp),
        skills: [],
    };


    if (jobData.skills && Array.isArray(jobData.skills)) {
        transformedJob.skills = jobData.skills.map((skillData: any) => ({
            skill: skillData.name,
            diffbotUri: skillData.diffbotUri,
        }));
    }

    return transformedJob;
}

// Utility function to subtract days from a date
function subtractDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}

export async function GET(
    request: NextRequest
) {

    const session = await getServerSession(authOptions);
    const searchParams = request.nextUrl.searchParams
    const url = searchParams.get('url')

    //console.log(session)

    if (!session || session.user?.id != "650f813286f63a9d8c0080ee") {
        redirect('/auth/signin')
    }

    //console.log(url)

    try {
        const diffbotDate = subtractDays(new Date(), 10);
        const apiUrl = `https://kg.diffbot.com/kg/v3/dql?type=query&token=${process.env.DIFFBOT_API_KEY}&query=type%3AJobPost%20date%3D%222023-10-14%22&size=1`

        const options = {
            method: 'GET',
            headers: { accept: 'application/json' },
        };

        const fetchResponse = await fetch(apiUrl, options);

        if (!fetchResponse.ok) {
            return NextResponse.json({ error: 'Failed to fetch data from the Diffbot API.' }, { status: fetchResponse.status });
        }
        const data = await fetchResponse.json();

        const transformedData = data.data.map((data: any) => transformDiffBotApiResponse(data.entity))

        const jobCreationResults = [];
        for (const jobData of transformedData) {
            const result = await createJob(jobData);
            if (result.error) {
                console.error(`Error creating job: ${result.error}`);
            } else {
                jobCreationResults.push(result);
            }
        }

        return NextResponse.json(jobCreationResults, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
