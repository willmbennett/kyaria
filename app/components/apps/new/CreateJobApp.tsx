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
import { usePathname, useRouter } from 'next/navigation';

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
        resumes: ResumeClass[],
    }) {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();
    const [selectedResumeId, setSelectedResumeId] = useState<string>(resumes[0]._id.toString() || '');
    // Find the selected resume based on the selectedResumeId
    const selectedResume = resumes.find(resume => resume._id === selectedResumeId);
    const path = usePathname()
    const router = useRouter()
    const { createApp } = useCreateApp(path)
    const { findOrCreateJob } = useCreateJob(path)
    const { handleCopyResume } = useCopyResume()


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
                        const { appId } = await createApp(jobId, userId, emails, profile.story, profile._id.toString(), newResumeId)
                        if (appId) router.push(`/apps/${appId}`)
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