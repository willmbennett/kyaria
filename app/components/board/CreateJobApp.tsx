import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { Button } from '../Button';
import { transformDiffBotApiResponse, emails } from '../../board/job-helper';
import { createJobApplicationAction } from '../../board/_action';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

type FormFields = {
    input: string;
};

export default function CreateJobApp(
    {
        userId,
        profile,
        setCreatingJobApp
    }: {
        userId: string,
        profile: any,
        setCreatingJobApp: any
    }) {
        const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            setLoading(true);

            // Make the API call to your Next.js route
            const response = await fetch(`/api/diffbot/job?url=${encodeURIComponent(data.input)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data from the API.');
            }

            const apiData = await response.json();

            //console.log(apiData)

            const transformedData = transformDiffBotApiResponse(apiData, data.input)
            // Handle the API response data here (e.g., setValues, etc.)
            //console.log(transformedData)

            const path = "/"
            const profileId = profile._id
            const resume = profile
            delete resume._id
            const userApp = {
                job: transformedData,
                profileId: profileId,
                resume: resume,
                userId: userId,
                emails: emails
            }
            await createJobApplicationAction(userApp, path);
            router.push("/board")

        } catch (error) {
            console.error(error);
            // Handle the error (e.g., display an error message to the user)
            alert('Creating job failed')
        } finally {
            setLoading(false);
            setCreatingJobApp(false)
        }

    };

    return (
        <>
            <div className='flex-col items-center w-full'>
                {!loading && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={BASIC_FIELD_STYLE}>
                            <input {...register('input', { required: true })} placeholder="Link to job post" className="rounded-sm"></input>
                            {errors.input && <p>Paste a link to the job post.</p>}
                        </div>

                        <div className={BASIC_FIELD_STYLE}>
                            <Button
                                variant="solid"
                                size="md"
                                type="submit"
                                className="mt-10 sm:mt-12"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                )}
                {loading && (<div className='flex-col items-center'>
                    <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                        Fetching your job post
                    </h1>
                    <iframe src="https://giphy.com/embed/gJ3mEToTDJn3LT6kCT" className="giphy-embed w-full"></iframe>
                </div>)}
            </div>
        </>
    );
}