'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../../Button';
import { transformDiffBotApiResponse, emails } from '../../../board/job-helper';
import { createAppAction, createJobApplicationAction, createResumeAction } from '../../../board/_action';
import { ProfileClass } from '../../../../models/Profile';
import { AppClass } from '../../../../models/App';
import { createJobAction } from '../../../jobs/_action';
import ResumeDropdownMenu from '../../ResumeDropdownMenu';
import { ResumeClass } from '../../../../models/Resume';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

type FormFields = {
    input: string;
};

export default function CreateJobApp(
    {
        userId,
        profile,
        resumes
    }: {
        userId: string,
        profile: ProfileClass,
        resumes: ResumeClass[]
    }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();
    const path = usePathname()
    const [selectedResumeId, setSelectedResumeId] = useState<string>(resumes[0]._id.toString() || '');

    // Find the selected resume based on the selectedResumeId
    const selectedResume = resumes.find(resume => resume._id === selectedResumeId);

    const handleCopyResume = async (data: ResumeClass) => {
        try {
            const resumeCopy: Partial<ResumeClass> = { ...data };

            delete resumeCopy._id;
            delete resumeCopy.createdAt;
            delete resumeCopy.updatedAt;
            delete resumeCopy.userId;

            const userResumeWithIds = { fromTemplate: true, ...resumeCopy, userId };
            const resumeId = await createResumeAction(userResumeWithIds, '/');

            if (resumeId) {
                return resumeId
            }
        } catch (error) {
            console.error('Error during resume copy:', error);
        }
    }

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

            if (apiData) {

                const transformedData = transformDiffBotApiResponse(apiData, data.input)
                // Handle the API response data here (e.g., setValues, etc.)
                console.log(transformedData)

                const jobId = await createJobAction({...transformedData, userId: userId}, path)
                console.log('jobId: ', jobId)
                console.log('selectedResume: ', selectedResume)
                if (jobId && selectedResume) {
                    console.log('Made it to resume creation')
                    const newResumeId = await handleCopyResume(selectedResume)
                    console.log('newResumeId: ', newResumeId)

                    if (newResumeId) {
                        console.log('Made it to app creation')
                        const userApp: Partial<AppClass> = {
                            job: jobId,
                            userId: userId,
                            emails: emails,
                            userStory: profile.story || '',
                            profile: profile._id,
                            userResume: newResumeId
                        }
                        console.log(userApp)
                        const appId = await createAppAction(userApp, path);
                        console.log('appId: ', appId)
                        console.log('App created Successfully')
                        if (appId)
                            //console.log(userApp)
                            router.push(`${appId}`)
                    }
                }
            }


        } catch (error) {
            console.error(error);
            // Handle the error (e.g., display an error message to the user)
            alert('Creating job failed')
            router.refresh()
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <div className='flex-col items-center w-full space-y-10 max-w-2xl'>
                <div className='flex flex-col gap-4 items-start'>
                    <p>Select which resume you want to use for your campaign. We'll make a copy of it for you to use for this application.</p>
                    <ResumeDropdownMenu
                        selectedResumeId={selectedResumeId}
                        setSelectedResumeId={setSelectedResumeId}
                        resumes={resumes}
                    />
                </div>
                <div>
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
                </div>
                {loading && (
                    <div className='flex-col items-center'>
                        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                            Fetching your job post
                        </h1>
                    </div>)}
            </div>
        </>
    );
}