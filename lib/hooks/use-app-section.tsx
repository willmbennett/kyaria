'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react';
import { progressStates, getProgress, ApplicationState, pageList } from '../../app/apps/app-helper';
import { JobStateType } from '../../app/board/job-helper';

const useAppNavigation = (
    appId: string,
    state: JobStateType,
) => {
    const searchParams = useSearchParams();
    const progress = searchParams.get('progress');
    const currentProgress = progressStates.find(p => getProgress(state) == p.label)?.section || 'Research';
    const activeProgressSection = progress || currentProgress || 'research';
    const activeProgress: ApplicationState = progressStates.find(p => activeProgressSection == p.section)?.label as ApplicationState || 'Research';

    const path = usePathname();
    const router = useRouter();

    // Map the states to the corresponding pages
    const statePagesMap: { [key in ApplicationState]: string[] } = {
        'Research': ['jobdescription', 'coverletter', 'resume', 'emails', 'notes', 'files'],
        'Phone Screen': ['story', 'mockinterview', 'emails', 'notes', 'files'],
        'Interviewing': ['story', 'mockinterview', 'emails', 'notes', 'files'],
        'Post-Offer': ['emails', 'notes', 'files'],
    };

    // Filter the pages based on the current state
    const filteredPages = pageList.filter(page =>
        statePagesMap[activeProgress].includes(page.section)
    );

    const baseRoute = `/apps/${appId}`;
    const currentSection = path.split('/').pop(); // Get the last part of the path
    const newRoute = `${baseRoute}/${filteredPages[0].section}${activeProgressSection ? `?progress=${activeProgressSection}` : ''}`;

    useEffect(() => {
        const allowedPages = filteredPages.map(p => p.section);
        if (currentSection && !allowedPages.includes(currentSection)) {
            router.push(newRoute, { scroll: false });
        }
    }, [currentSection, filteredPages, newRoute, router]);

    return { filteredPages, activeProgressSection };
};

export default useAppNavigation;