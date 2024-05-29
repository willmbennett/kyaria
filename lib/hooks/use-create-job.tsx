import { transformDiffBotApiResponse } from "../../app/board/job-helper"
import { createJobAction, findJobByLinkAction } from "../../app/jobs/_action"

export const useCreateJob = (path: string) => {
    const findOrCreateJob = async (link: string, userId: string) => {
        let jobId

        // Job Handling
        const foundJobId = await findJobByLinkAction(link, path)

        if (foundJobId) {
            //console.log('Job was found: ', foundJobId)
            jobId = foundJobId
        } else {

            // Make the API call to your Next.js route
            const response = await fetch(`/api/diffbot/job?url=${encodeURIComponent(link)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data from the API.');
            }

            const apiData = await response.json();
            const transformedData = transformDiffBotApiResponse(apiData, link)
            // Handle the API response data here (e.g., setValues, etc.)
            //console.log(transformedData)

            const newJobId = await createJobAction({ ...transformedData, userId: userId }, path)
            //console.log('jobId: ', newJobId)
            //console.log('selectedResume: ', selectedResume)
            jobId = newJobId
        }
        return jobId
    }
    return { findOrCreateJob }
}