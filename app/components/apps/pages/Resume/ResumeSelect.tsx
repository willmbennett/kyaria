'use server'
import { format } from "date-fns";
import { getResumes } from "../../../../../lib/resume-db";
import { ResumeDropdown } from "./ResumeDropdown";

interface ResumeSelectionProps {
    userId: string;
    jobAppId: string;
    currentResume: string;
}

export async function ResumeSelection({ userId, jobAppId, currentResume }: ResumeSelectionProps) {

    const { resumes } = await getResumes(userId);

    const resumesForSelection = resumes?.map((r, index) => {
        const resumeDate = r.createdAt ? format(new Date(r.createdAt), 'LLLL d, yyyy') : ''
        const name = index + ') ' + (r.title || r.name) + ' - ' + resumeDate

        return (
            { id: r._id.toString(), name }
        )
    })

    return (
        <ResumeDropdown
            resumes={resumesForSelection || []} currentResume={currentResume} userId={userId} jobAppId={jobAppId} />
    )
}