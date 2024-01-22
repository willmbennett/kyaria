import React from 'react';
import ResumeTemplates from '../Template';
import { ResumeClass } from '../../../../models/Resume';
import { useRouter } from 'next/navigation';
import { createResumeAction } from '../../../board/_action';

const ResumeTemplateForm = ({ userId }: { userId: string }) => {
    const router = useRouter()

    const handleTemplateSelection = async (resumeTemplate: Partial<ResumeClass>) => {
        const userResumeWithIds = { fromTemplate: true, ...resumeTemplate, userId: userId }
        console.log('userResumeWithIds', userResumeWithIds)
        const resumeId = await createResumeAction(userResumeWithIds, '/')
        if (resumeId) {
            router.push(`resumebuilder/${resumeId}`)
        }
    }

    return (
        <>
            <ResumeTemplates userId={userId} handleTemplateSelection={handleTemplateSelection} />
        </>
    );
}

export default ResumeTemplateForm;
