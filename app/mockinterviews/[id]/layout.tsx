import { checkSubscription } from '../../../lib/hooks/check-subscription';
import { cache } from 'react';
import { SideBarItem } from '../../helper';
import { getMockInterviews } from '../../../lib/mockinterview-db';
import { MockInterviewClass } from '../../../models/MockInterview';
import { redirect } from 'next/navigation';
import { SidebarWrapper } from '../../components/sidebar/SidebarWrapper';
import { getJobApp, getUserJobApps } from '../../../lib/app-db';
import { AppClass } from '../../../models/Exports';
import { JobClass } from '../../../models/Job';
import { ActionItemType } from '../../board/job-helper';
import { deleteChatAction } from '../../eve/_action';
import { updateJobAppAction } from '../../apps/_action';

const loadApps = cache(async (filter: { userId: string }) => {
    //console.log('made it to [getUserJobApps]')
    return await getUserJobApps(filter)
})

export default async function MockInterviews({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await checkSubscription(true)

    const filter = {
        userId
    }

    const { jobApps } = await loadApps(filter) as { jobApps: AppClass[] }

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

    const createMockInterview = async () => {
        "use server"
        redirect('/mockinterviews')
    }

    const handleMockInterviewDeletion: ActionItemType = async (appId: string, path: string) => {
        "use server"
        const { app } = await getJobApp(appId)
        const chatId = app?.chatId?.toString()
        console.log('About to delete chat for app: ', appId, 'with chatId: ', chatId)
        if (chatId) {
            const { error } = await deleteChatAction({ id: chatId, path })
            if (error) {
                return { error }
            } else {
                updateJobAppAction(appId, { chatId: null })
                const url = "/mockinterviews"
                return { url }
            }
        }
        return { error: 'No Chat found' }
    }

    return (
        <SidebarWrapper
            userId={userId}
            sideBarTitle={'Mock Interviews'}
            items={items}
            createNew={createMockInterview}
            newTitle={'New Mock Interview'}
            deleteItemAction={handleMockInterviewDeletion}
        >
            {children}
        </SidebarWrapper>
    )
}