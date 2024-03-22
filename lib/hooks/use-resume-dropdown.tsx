import { useEffect, useState } from "react";
import { ResumeClass } from "../../models/Resume";

interface UseResumeDropProps {
    resumes: ResumeClass[]
}

export const useResumeDropDown = ({ resumes }: UseResumeDropProps) => {
    const resumeLength = resumes.length
    const hasResumes = resumeLength > 0

    const [selectedResumeId, setSelectedResumeId] = useState<string>(hasResumes ? resumes[0]._id.toString() : '');

    // Find the selected resume based on the selectedResumeId
    const selectedResume = hasResumes ? (resumes.find(resume => resume._id === selectedResumeId) || resumes[0]) : undefined
    //console.log(selectedResume)

    useEffect(() => {
        if (resumeLength == 1 && !selectedResumeId) setSelectedResumeId(resumes[0]._id.toString())
    }, [resumes])

    return { hasResumes, selectedResumeId, setSelectedResumeId, selectedResume }

}