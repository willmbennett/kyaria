'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../Button';
import { emails } from '../../../board/job-helper';
import { useCreateApp } from '../../../../lib/hooks/use-create-app';
import { useCreateJob } from '../../../../lib/hooks/use-create-job';
import { usePathname, useRouter } from 'next/navigation';
import { IconSpinner } from '../../ui/icons';
import { updateResumeAction } from '../../../resumebuilder/_action';
import { DropResumeBanner } from '../../chatbot/DropResumeBanner';

const LOCAL_STORAGE_KEY = 'onboardingApplication';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full';

type FormFields = {
    input: string;
};

export default function JobAppUploader({
    userId,
    profileId,
    story = '',
    userResume,
    boardId,
}: {
    userId: string;
    profileId?: string;
    story?: string;
    userResume?: string;
    boardId?: string | null;
}) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormFields>();
    const path = usePathname();
    const router = useRouter();

    const appParams: any = {
        userId,
        emails,
        story,
        userResume,
    };
    if (profileId) appParams.profile = profileId;
    if (boardId) appParams.boardId = boardId;

    const { createApp } = useCreateApp(appParams);
    const { findOrCreateJob } = useCreateJob(path);
    const currentUrl = watch('input');

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        if (userResume) {
            try {
                setLoading(true);
                const jobId = await findOrCreateJob(data.input, userId);
                if (jobId) {

                    const { appId } = await createApp(jobId);

                    if (appId) {
                        await updateResumeAction(userResume, { appId });

                        // Handle onboarding flow. Set the local storage up
                        if (userId === 'n/a') {
                            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appId));
                        } else {
                            router.push(`/apps/${appId}`);
                        }
                    }
                }
            } catch (error) {
                // Handle the error (e.g., display an error message to the user)
                alert('Creating job failed');
                setLoading(false);
            }
        }
    };

    return (
        <div className='flex-col items-center w-full space-y-4 max-w-2xl'>
            {!userResume ? (
                <div className='flex flex-col gap-4 items-start'>
                    <DropResumeBanner userId={userId} />
                </div>
            ) : (
                <div>
                    {!loading && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={BASIC_FIELD_STYLE}>
                                <input {...register('input', { required: true })} placeholder="Link to job post" className="rounded-sm" />
                                {errors.input && <p>Paste a link to the job post.</p>}
                            </div>
                            {currentUrl && (
                                <div className={BASIC_FIELD_STYLE}>
                                    <Button
                                        variant="solid"
                                        size="md"
                                        type="submit"
                                        className="mt-2"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            )}
            {loading && (
                <div className="flex gap-2 items-center">
                    <p>Fetching the job post</p>
                    <IconSpinner />
                </div>
            )}
        </div>
    );
}