import { Dispatch, SetStateAction } from "react"
import { ResumeClass } from "../../models/Resume"
import ResumeDropdownMenu from "./ResumeDropdownMenu"
import { DropResumeBanner } from "./chatbot/DropResumeBanner"

interface ResumeDropAndSelectProps {
    userId: string;
    resumes: ResumeClass[];
    hasResumes: boolean;
    selectedResumeId: string;
    setSelectedResumeId: Dispatch<SetStateAction<string>>;
}

export const ResumeDropAndSelect = ({ userId, resumes, hasResumes, selectedResumeId, setSelectedResumeId }: ResumeDropAndSelectProps) => {

    return (
        <div className='pt-3'>
            {hasResumes ?
                <div className='flex flex-col gap-2'>
                    <h2 className="text-2xl font-semibold leading-tight text-slate-900">Select which resume to use</h2>
                    <p>This resume will be used personalize your experience.</p>
                    <ResumeDropdownMenu
                        selectedResumeId={selectedResumeId}
                        setSelectedResumeId={setSelectedResumeId}
                        resumes={resumes}
                    />
                </div>
                :
                <DropResumeBanner
                    userId={userId}
                />
            }
        </div>
    )
}