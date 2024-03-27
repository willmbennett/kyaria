import { Metadata } from 'next';
import { SidebarMobile } from '../components/sidebar/MobileSidebar';
import { ItemHistory } from '../components/sidebar/ItemHistory';
import { SidebarDesktop } from '../components/sidebar/SidebarDesktop';
import { getResumes } from '../../lib/resume-db';
import { checkSubscription } from '../../lib/hooks/check-subscription';
import { ResumeClass } from '../../models/Resume';
import { format } from 'date-fns';
import { DesktopOpenSideBar } from '../components/sidebar/DesktopOpenSideBar';

const title = "Kyaria.ai - Advanced AI Resume Builder for ATS Optimization";
const description = "Revolutionize your job hunt with Kyaria.ai's AI-powered Resume Builder. Craft ATS-optimized resumes easily and elevate your career prospects.";

export const metadata: Metadata = {
    metadataBase: new URL('https://www.kyaria.ai/resumebuilder'),
    title,
    description,
    openGraph: {
        title,
        description,
        locale: 'en_US',
        type: 'website',
        url: 'https://www.kyaria.ai/resumebuilder'
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
    },
};

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await checkSubscription()

    const { resumes } = await getResumes(userId)

    const handleResumeCreation = async () => {
        'use server'
        return { url: '/resumebuilder/new' }
    }

    const items = resumes?.map((resume: ResumeClass, index: number) => {
        const resumeDate = resume.createdAt ? format(new Date(resume.createdAt.toString()), 'LLLL d, yyyy') : ''
        //console.log(resumeDate)
        const resumeTitle = (index + 1) + ') ' + (resume?.title || resume?.name || 'Resume ') + ' - ' + resumeDate
        return {
            id: resume._id.toString(),
            href: `/resumebuilder/${resume._id.toString()}`,
            title: resumeTitle,
            editable: true
        }
    })

    return (
        <div className="w-screen min-h-screen">
            <SidebarMobile>
                <ItemHistory
                    sideBarTitle={'Session History'}
                    items={items}
                    createNew={handleResumeCreation}
                    newTitle={'New Resume'}
                />
            </SidebarMobile>
            <DesktopOpenSideBar />
            <SidebarDesktop
                sideBarTitle={'Session History'}
                items={items}
                createNew={handleResumeCreation}
                newTitle={'New Resume'}
            />
            <div className='lg:ml-10'>
                {children}
            </div>
        </div>);
}