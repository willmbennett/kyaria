'use client'
import { ApplicationState, getProgress, pageList, progressStates } from '../../app/apps/app-helper';
import { JobStateType } from '../../app/board/job-helper';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const useAppNavigation = (
    appId: string,
    state: JobStateType,
) => {
    const searchParams = useSearchParams()
    const progress = searchParams.get('progress')
    const currentProgress = progressStates.find(p => getProgress(state) == p.label)?.section || 'Research'
    const activeProgressSection = progress || currentProgress || 'research'
    const activeProgress: ApplicationState = progressStates.find(p => activeProgressSection == p.section)?.label as ApplicationState || 'Research'

    const path = usePathname()
    const router = useRouter()

    // Map the states to the corresponding pages
    const statePagesMap: { [key in ApplicationState]: string[] } = {
        'Research': ['jobdescription', 'coverletter', 'resume', 'emails', 'notes', 'files'],
        'Phone Screen': ['story', 'mockinterview', 'emails', 'experience', 'notes', 'files'],
        'Interviewing': ['story', 'mockinterview', 'experience', 'emails', 'notes', 'files'],
        'Post-Offer': ['emails', 'notes', 'files'],
    };

    // Filter the pages based on the current state
    const filteredPages = pageList.filter(page =>
        statePagesMap[activeProgress].includes(page.section)
    );
    // If we're not currently on a section in filtered pages
    const baseRoute = `/apps/${appId}`
    const currentSection = path.split('/')[-1]
    const newRoute = `${baseRoute}/${filteredPages[0].section}${activeProgressSection ? `?progress=${activeProgressSection}` : ''}`

    const allowedPages = filteredPages.map(p => p.label)
    if (!allowedPages.includes(currentSection)) router.push(newRoute, { scroll: false })

    return { filteredPages, activeProgressSection }
};

export default useAppNavigation;
