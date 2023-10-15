import https from 'https';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { content } = await request.json();

    console.log(content);

    if (!content || typeof content !== 'string') {
        return new NextResponse(JSON.stringify({ error: 'Please provide resume content in the request body under "content" key.' }), { status: 400 });
    }

    const base64Doc = Buffer.from(content, 'utf-8').toString('base64');
    const modifiedDate = new Date().toISOString().substring(0, 10);

    const postData = JSON.stringify({
        'DocumentAsBase64String': base64Doc,
        'DocumentLastModified': modifiedDate
    });

    const options = {
        host: 'rest.resumeparsing.com',
        protocol: 'https:',
        path: '/v10/parser/resume',
        method: 'POST',
        headers: {
            'Sovren-AccountId': process.env.SOVREN_ACCOUNT_ID,
            'Sovren-ServiceKey': process.env.SOVREN_SERVICE_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise<NextResponse>((resolve, reject) => {
        const req = https.request(options, (response) => {
            console.log(`STATUS: ${response.statusCode}`);
            response.setEncoding('utf8');

            let responseAsString = '';

            response.on('data', (chunk) => {
                responseAsString += chunk;
            });

            response.on('end', () => {
                try {
                    const responseAsJson = JSON.parse(responseAsString);
                    const resumeData = responseAsJson.Value.ResumeData;
                    resolve(new NextResponse(JSON.stringify({ parsedResume: resumeData }), { status: 200 }));
                } catch (err) {
                    console.error('Error while processing the response:', err);
                    reject(new NextResponse(JSON.stringify({ error: 'An error occurred while processing the server response.' }), { status: 500 }));
                }
            });
        });

        req.on('error', (error) => {
            console.error('Error with request:', error);
            reject(new NextResponse(JSON.stringify({ error: 'An error occurred while processing your request.' }), { status: 500 }));
        });

        req.write(postData);
        req.end();
    });
}
