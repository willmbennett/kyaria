'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../Button';
import { emails } from '../../../board/job-helper';
import { ProfileClass } from '../../../../models/Profile';
import ResumeDropdownMenu from '../../ResumeDropdownMenu';
import { ResumeClass } from '../../../../models/Resume';
import { useCreateApp } from '../../../../lib/hooks/use-create-app';
import { useCreateJob } from '../../../../lib/hooks/use-create-job';
import { useCopyResume } from '../../../../lib/hooks/use-copy-resume';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconSpinner } from '../../ui/icons';
import { useResumeDropDown } from '../../../../lib/hooks/use-resume-dropdown';
import { ResumeDropAndSelect } from '../../ResumeDropAndSelect';
import { updateResumeAction } from '../../../resumebuilder/_action';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

type FormFields = {
    input: string;
};

export default function CreateJobApp(
    {
        userId,
        profileId,
        story = '',
        resumes
    }: {
        userId: string,
        profileId: string,
        story?: string;
        resumes: ResumeClass[],
    }) {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormFields>();
    const { hasResumes, selectedResumeId, setSelectedResumeId, selectedResume } = useResumeDropDown({ resumes })
    const path = usePathname()
    const router = useRouter()
    const sp = useSearchParams()
    const boardId = sp.get('board')
    const { createApp } = useCreateApp(path)
    const { findOrCreateJob } = useCreateJob(path)
    const { handleCopyResume } = useCopyResume()
    const currentUrl = watch('input')


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        if (selectedResume) {
            try {
                setLoading(true);
                const jobId = await findOrCreateJob(data.input, userId, selectedResume)
                if (jobId) {
                    //console.log('Made it to resume creation')
                    const newResumeId = await handleCopyResume(userId, selectedResume)
                    //console.log('newResumeId: ', newResumeId)

                    if (newResumeId) {
                        let newAppId
                        if (boardId) {
                            const { appId } = await createApp(jobId, userId, emails, story, profileId, newResumeId, boardId)
                            newAppId = appId
                        } else {
                            const { appId } = await createApp(jobId, userId, emails, story, profileId, newResumeId)
                            newAppId = appId
                        }
                        if (newAppId) {
                            await updateResumeAction(newResumeId, { appId: newAppId })
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
        <>
            <div className='flex pb-3'>
                <Button size='sm' variant='ghost' href={`/board${boardId ? `/${boardId}` : '/default'}`}>← Back to Board</Button>
            </div>
            <h1 className="pb-10 text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-6xl xl:leading-tighter">
                Add a new Job Application
            </h1>
            <div className='flex-col items-center w-full space-y-10 max-w-2xl'>
                <div className='flex flex-col gap-4 items-start'>
                    <ResumeDropAndSelect
                        userId={userId}
                        resumes={resumes}
                        hasResumes={hasResumes}
                        selectedResumeId={selectedResumeId}
                        setSelectedResumeId={setSelectedResumeId}
                    />
                </div>
                <div>
                    {!loading && selectedResume && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={BASIC_FIELD_STYLE}>
                                <input {...register('input', { required: true })} placeholder="Link to job post" className="rounded-sm"></input>
                                {errors.input && <p>Paste a link to the job post.</p>}
                            </div>
                            {(selectedResume && currentUrl) &&
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