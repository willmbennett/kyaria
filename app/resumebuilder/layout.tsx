import { SidebarMobile } from '../components/sidebar/MobileSidebar';
import { ItemHistory } from '../components/sidebar/ItemHistory';
import { getResumes } from '../../lib/resume-db';
import { checkSubscription } from '../../lib/hooks/check-subscription';
import { ResumeClass } from '../../models/Resume';
import { format } from 'date-fns';
import { DesktopOpenSideBar } from '../components/sidebar/DesktopOpenSideBar';
import { ActionItemType } from '../board/job-helper';
import { deleteResumeAction } from './_action';
import { SidebarWrapper } from '../components/sidebar/SidebarWrapper';

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await checkSubscription(true)

    const { resumes } = await getResumes(userId) as { resumes: ResumeClass[] }

    const handleResumeCreation = async () => {
        'use server'
        return { url: '/resumebuilder/new' }
    }

    const items = resumes.map((resume: ResumeClass, index: number) => {
        const resumeDate = resume.createdAt ? format(new Date(resume.createdAt.toString()), 'LLLL d, yyyy') : ''
        //console.log(resumeDate)
        const resumeTitle = (index + 1) + ') ' + (resume?.title || resume?.name || 'Resume ') + ' - ' + resumeDate
        return {
            id: resume._id.toString(),
            href: `/resumebuilder/${resume._id.toString()}`,
            title: resumeTitle,
            editable: true,
            category: 'Resume',
            itemUrl: resume.vercelLink
        }
    })

    const handleResumeDeletion: ActionItemType = async (resumeId: string, path: string, vercelLink?: string) => {
        "use server"
        //console.log('Made it to resume deletion with id: ', resumeId)
        const { error } = await deleteResumeAction({ id: resumeId, path, fileUrl: vercelLink })

        if (error) {
            return { error }
        } else {
            const url = "/resumebuilder"
            return { url }
        }
    }

    return (
        <SidebarWrapper
            userId={userId}
            sideBarTitle={'Resumes'}
            items={items}
            createNew={handleResumeCreation}
            newTitle={'New Resume'}
            deleteItemAction={handleResumeDeletion}
        >
            {children}
        </SidebarWrapper>
    );
}