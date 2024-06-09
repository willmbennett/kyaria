import { useCallback, useState } from 'react';
import { transformParsedResume } from '../../app/resumebuilder/resumetest-helper';
import { createResumeAction } from '../../app/resumebuilder/_action';
import type { PutBlobResult } from '@vercel/blob';

const LOCAL_STORAGE_KEY = 'onboardingResume'

interface UseSubmitResumeProps {
    onError?: (error: Error) => void;
    onSuccess?: (resumeId: string) => Promise<void>; // Now clearly async
}

const useSubmitResume = ({ onError, onSuccess }: UseSubmitResumeProps) => {
    const [isLoading, setLoading] = useState(false);

    const fetchOnboardingResume = localStorage.getItem(LOCAL_STORAGE_KEY)

    const handleResumeCreation = useCallback(async (base64File: string, userId: string, file?: File | null, userUploaded: boolean = false) => {
        setLoading(true);

        try {
            const response = await fetch('/api/sovren', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: base64File }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { parsedResume } = await response.json();

            // upload file to Vercel
            let vercelLink = null;

            if (file) {
                try {
                    const fileUploadResponse = await fetch(`/api/files?filename=${file.name}`, {
                        method: 'POST',
                        body: file,
                    });

                    if (!fileUploadResponse.ok) {
                        throw new Error(`File upload failed with status: ${fileUploadResponse.status}`);
                    }

                    const newBlob = await fileUploadResponse.json() as PutBlobResult;
                    vercelLink = newBlob.url;
                } catch (error) {
                    console.error('Error occurred during file upload:', error);
                    // Handle error appropriately (e.g., display error message to user)
                }
            }

            if (userId) {

                const resumeToCreate = transformParsedResume(parsedResume);
                const userResumeWithIds = { ...resumeToCreate, userId, vercelLink, userUploaded };

                const resumeId = await createResumeAction(userResumeWithIds, '/');
                if (!resumeId) {
                    throw new Error("Failed to create resume");
                }

                // If the user isn't logged in (for onboarding flow) store the resumeId in localstorage so we can access it
                if (userId == 'n/a') {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeId))
                }

                if (onSuccess) {
                    await onSuccess(resumeId); // Awaiting onSuccess callback
                }
            }
        } catch (error) {
            console.error('Error in resume upload:', error);
            onError && onError(error instanceof Error ? error : new Error('An unexpected error occurred'));
        } finally {
            setLoading(false);
        }
    }, [onError, onSuccess]);

    return { isLoading, handleResumeCreation, fetchOnboardingResume };
};

export default useSubmitResume;
