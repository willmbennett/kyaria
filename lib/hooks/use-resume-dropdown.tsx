import { useEffect, useState } from "react";
import { ResumeClass } from "../../models/Resume";

interface UseResumeDropProps {
    resumes: ResumeClass[]
    currentResume?: string
}

export const useResumeDropDown = ({ resumes, currentResume }: UseResumeDropProps) => {
    const resumeLength = resumes.length
    const hasResumes = resumeLength > 0

    const defaultResume = currentResume ? currentResume : (hasResumes ? resumes[0]._id.toString() : '')

    const [selectedResumeId, setSelectedResumeId] = useState<string>(defaultResume);

    // Find the selected resume based on the selectedResumeId
    const selectedResume = hasResumes ? (resumes.find(resume => resume._id === selectedResumeId) || resumes[0]) : undefined
    //console.log(selectedResume)

    useEffect(() => {
        if (resumeLength == 1 && !selectedResumeId) setSelectedResumeId(resumes[0]._id.toString())
    }, [resumes])

    return { hasResumes, selectedResumeId, setSelectedResumeId, selectedResume }

}