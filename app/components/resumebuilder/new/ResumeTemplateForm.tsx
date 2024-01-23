import React from 'react';
import ResumeTemplates from '../Template';
import { ResumeClass } from '../../../../models/Resume';
import { useRouter } from 'next/navigation';
import { createResumeAction } from '../../../board/_action';

const ResumeTemplateForm = ({ userId }: { userId: string }) => {
    const router = useRouter()

    const handleTemplateSelection = async (resumeTemplate: ResumeClass) => {
        const templateData: Partial<ResumeClass> = { ...resumeTemplate } 
        delete templateData._id
        delete templateData.createdAt
        delete templateData.updatedAt
        delete templateData.userId
        const userResumeWithIds = { fromTemplate: true, ...templateData, userId: userId }
        //console.log('userResumeWithIds', userResumeWithIds)
        const resumeId = await createResumeAction(userResumeWithIds, '/')
        //console.log('created resume', resumeId)
        if (resumeId) {
            router.push(`/resumebuilder/${resumeId}`)
        }
    }

    return (
        <>
            <ResumeTemplates handleTemplateSelection={handleTemplateSelection} userId={userId} />
        </>
    );
}

export default ResumeTemplateForm;
