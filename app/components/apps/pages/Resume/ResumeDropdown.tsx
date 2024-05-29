'use client'
import { useState } from "react"
import { DropResumeBanner } from "../../../chatbot/DropResumeBanner"
import ResumeDropdownMenu from "./ResumeDropdownMenu";
import { updateJobAppAction } from "../../../../apps/_action";
import { useRouter } from "next/navigation";

interface ResumeDropdownProps {
    resumes: { name: string, id: string }[];
    currentResume: string;
    userId: string;
    jobAppId: string
}

export const ResumeDropdown = ({ resumes, currentResume, userId, jobAppId }: ResumeDropdownProps) => {
    const resumeLength = resumes.length
    const hasResumes = resumeLength > 0
    const router = useRouter()

    const defaultResume = currentResume ? currentResume : (hasResumes ? resumes[0].id.toString() : '')

    const [selectedResumeId, setSelectedResumeId] = useState<string>(defaultResume);

    const selectResume = (resumeId: string) => {
        setSelectedResumeId(resumeId)
        updateJobAppAction(jobAppId, { userResume: resumeId })
        router.refresh()
    }

    if (hasResumes) {
        return (
            <div className='flex flex-col gap-2 py-4'>
                <p className="text-md leading-tight text-slate-500">Change which resume to use with the application</p>
                <div>
                    <ResumeDropdownMenu
                        selectedResumeId={selectedResumeId}
                        selectResume={selectResume}
                        resumes={resumes}
                    />
                </div>
            </div>
        )
    }

    return (
        <>
            <h2 className="text-2xl font-semibold leading-tight text-slate-900">Select which resume to use</h2>
            <p>This resume will be used personalize your experience.</p>
            <DropResumeBanner
                userId={userId}
            />
        </>
    )
}