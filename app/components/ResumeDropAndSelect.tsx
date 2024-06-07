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
    customMessage?: string;
}

export const ResumeDropAndSelect = ({
    userId,
    resumes,
    hasResumes,
    selectedResumeId,
    setSelectedResumeId,
    customMessage
}: ResumeDropAndSelectProps) => {

    return (
        <div className='w-full'>
            {hasResumes ?
                <div className='flex flex-col gap-2'>
                    <h2 className="text-2xl font-semibold leading-tight text-slate-900">Select which resume to use</h2>
                    <p>{customMessage ? customMessage : "This resume will be used personalize your experience."}</p>
                    <div>
                        <ResumeDropdownMenu
                            selectedResumeId={selectedResumeId}
                            setSelectedResumeId={setSelectedResumeId}
                            resumes={resumes}
                        />
                    </div>
                </div>
                :
                <DropResumeBanner
                    userId={userId}
                />
            }
        </div>
    )
}