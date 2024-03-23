import { useCallback, useState } from 'react';
import { transformParsedResume } from '../../app/resumebuilder/resumetest-helper';
import { createResumeAction } from '../../app/board/_action';

interface UseSubmitResumeProps {
    onError?: (error: Error) => void;
    onSuccess?: (resumeId: string) => Promise<void>; // Now clearly async
}

const useSubmitResume = ({ onError, onSuccess }: UseSubmitResumeProps) => {
    const [isLoading, setLoading] = useState(false);

    const handleResumeCreation = useCallback(async (base64File: string, userId: string) => {
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

            if (userId) {

                const resumeToCreate = transformParsedResume(parsedResume);
                const userResumeWithIds = { ...resumeToCreate, userId };

                const resumeId = await createResumeAction(userResumeWithIds, '/');
                if (!resumeId) {
                    throw new Error("Failed to create resume");
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

    return { isLoading, handleResumeCreation };
};

export default useSubmitResume;
