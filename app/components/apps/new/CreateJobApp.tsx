'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../Button';
import { emails } from '../../../board/job-helper';
import { useCreateApp } from '../../../../lib/hooks/use-create-app';
import { useCreateJob } from '../../../../lib/hooks/use-create-job';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconSpinner } from '../../ui/icons';
import { updateResumeAction } from '../../../resumebuilder/_action';
import { DropResumeBanner } from '../../chatbot/DropResumeBanner';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

type FormFields = {
    input: string;
};

export default function CreateJobApp(
    {
        userId,
        profileId,
        story = '',
        userResume
    }: {
        userId: string,
        profileId: string,
        story?: string;
        userResume?: string;
    }) {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormFields>();
    const path = usePathname()
    const router = useRouter()
    const sp = useSearchParams()
    const boardId = sp.get('board')
    const { createApp } = useCreateApp(path)
    const { findOrCreateJob } = useCreateJob(path)
    const currentUrl = watch('input')


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        if (userResume) {
            try {
                setLoading(true);
                const jobId = await findOrCreateJob(data.input, userId)
                if (jobId) {
                    if (userResume) {
                        let newAppId
                        if (boardId) {
                            const { appId } = await createApp(jobId, userId, emails, story, profileId, userResume, boardId)
                            newAppId = appId
                        } else {
                            const { appId } = await createApp(jobId, userId, emails, story, profileId, userResume)
                            newAppId = appId
                        }
                        if (newAppId) {
                            await updateResumeAction(userResume, { appId: newAppId })
                            router.push(`/apps/${newAppId}`)
                        }

                    }
                }
            } catch (error) {
                //console.error(error);
                // Handle the error (e.g., display an error message to the user)
                alert('Creating job failed')
                setLoading(false);
            }
        }
    };

    return (
        <> <div className='flex pb-3'>
            <Button size='sm' variant='ghost' href={`/board${boardId ? `/${boardId}` : '/default'}`}>← Back to Board</Button>
        </div>
            <h1 className="pb-10 text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-6xl xl:leading-tighter">
                Add a new Job Application
            </h1>
            <div className='flex-col items-center w-full space-y-10 max-w-2xl'>
                {!userResume ?
                    <div className='flex flex-col gap-4 items-start'>
                        {!userResume && <DropResumeBanner userId={userId} />}
                    </div>
                    :
                    <div>
                        {!loading && (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={BASIC_FIELD_STYLE}>
                                    <input {...register('input', { required: true })} placeholder="Link to job post" className="rounded-sm"></input>
                                    {errors.input && <p>Paste a link to the job post.</p>}
                                </div>
                                {(currentUrl) &&
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
                                }
                            </form>
                        )}
                    </div>
                }
                {loading && (
                    <div className="flex gap-2 items-center">
                        <p>Fetching the job post</p>
                        <IconSpinner />
                    </div>
                )}

            </div>
        </>
    );
}