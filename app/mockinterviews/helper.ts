import { AppClass } from "../../models/Exports"
import { JobClass } from "../../models/Job"
import { SideBarItem } from "../helper"

export const getMockInterviewSidebarItems = (jobApps: AppClass[]) => {
    const items: SideBarItem[] = jobApps.map((app: AppClass, index: number) => {
        const job = app.job as JobClass

        return ({
            id: app._id.toString(),
            href: `/mockinterviews/${app._id.toString()}`,
            title: job.jobTitle + (job.company && ' - ') + job.company,
            editable: true,
            category: 'Mock Interview'
        })
    })

    return items
}

export const interviewTypeOptions = [
    { id: 'phonescreen', label: 'Phone Screen' },
    { id: 'behavioral', label: 'Behavioral' },
    { id: 'technical', label: 'Technical' },
    { id: 'case', label: 'Case' }
]