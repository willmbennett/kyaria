import { useEffect, useState } from "react";
import { ResumeClass } from "../../models/Resume";
import { getResumeAction, getResumesAction } from "../../app/resumebuilder/_action";

interface UseResumeDropProps {
    userId: string;
    userResume?: string
}

export const useResumeDropDown = ({ userId, userResume }: UseResumeDropProps) => {
    const [resume, setResume] = useState<ResumeClass>()
    const [resumes, setResumes] = useState<ResumeClass[]>([])
    const [selectedResumeId, setSelectedResumeId] = useState<string>(userResume || '');

    const handleSetResume = async (resumeId: string) => {
        const resume = await getResumeAction(resumeId)
        setResume(resume)
    }

    const handleSetResumes = async (userId: string) => {
        const resumes = await getResumesAction(userId)
        setResumes(resumes || [])
    }

    useEffect(() => {
        if (selectedResumeId) {
            handleSetResume(selectedResumeId)
        }
    }, [selectedResumeId])

    useEffect(() => {
        handleSetResumes(userId)
    }, [userId])

    const resumeLength = resumes.length
    const hasResumes = (userResume || resume) ? true : false

    useEffect(() => {
        if (resumeLength == 1 && !selectedResumeId) setSelectedResumeId(resumes[0]._id.toString())
    }, [resumes])

    return { hasResumes, selectedResumeId, setSelectedResumeId, resume, resumes }

}