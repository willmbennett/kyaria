const maxRetryCount = 3;
const maxDelaySec = 4;

export async function fetchWithRetries(url: string, options: RequestInit, retries = 1): Promise<Response> {
    //console.log(`fetchWithRetries called, attempt: ${retries}, url: ${url}`);
    try {
        const response = await fetch(url, options);
        //console.log(`Fetch attempt ${retries} successful`);
        return response;
    } catch (err) {
        console.error(`Fetch attempt ${retries} failed with error: ${err}`);
        if (retries <= maxRetryCount) {
            const delay = Math.min(Math.pow(2, retries) / 4 + Math.random(), maxDelaySec) * 1000;
            //console.log(`Waiting ${delay}ms before retrying...`);

            await new Promise((resolve) => setTimeout(resolve, delay));

            //console.log(`Retrying fetch, attempt number: ${retries + 1}`);
            return fetchWithRetries(url, options, retries + 1);
        } else {
            console.error(`Max retries exceeded for URL: ${url}`);
            throw new Error(`Max retries exceeded. error: ${err}`);
        }
    }
}