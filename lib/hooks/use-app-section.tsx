import { ApplicationState, getProgress, pageList, progressStates } from '../../app/apps/[id]/app-helper';
import { JobStateType } from '../../app/board/job-helper';

const useAppNavigation = (
    state: JobStateType,
    searchParams: { section: string, progress: string },
    companyDiffbotUri?: string,
) => {
    const currentProgress = progressStates.find(p => getProgress(state) == p.label)?.section || 'Research'
    //console.log('currentProgress: ', currentProgress)
    const activeProgressSection = searchParams['progress'] || currentProgress || 'research'
    //console.log('activeProgressSection: ', activeProgressSection)
    const activeProgress: ApplicationState = progressStates.find(p => activeProgressSection == p.section)?.label as ApplicationState || 'Research'
    //console.log('activeProgress: ', activeProgress)

    // Dynamically create the 'Research' state pages based on the existence of companyDiffbotUri
    /*
    const researchPages = ['jobdescription', 'elevatorpitch', 'coverletter', 'resume'];
    if (companyDiffbotUri) {
        researchPages.push('networking');
    }
    */

    // Map the states to the corresponding pages
    const statePagesMap: { [key in ApplicationState]: string[] } = {
        'Research': ['jobdescription', 'coverletter', 'resume', 'emails', 'notes'],
        'Phone Screen': ['story', 'mockinterview', 'emails', 'experience', 'notes'],
        'Interviewing': ['story', 'mockinterview', 'experience', 'emails', 'notes'],
        'Post-Offer': ['emails', 'notes'],
    };

    // Filter the pages based on the current state
    const filteredPages = pageList.filter(page =>
        statePagesMap[activeProgress].includes(page.section)
    );
    //console.log('filteredPages: ', filteredPages)

    const currentSection = searchParams['section'] || filteredPages[0].section
    //console.log('currentSection: ', currentSection)

    return { currentSection, filteredPages, activeProgressSection }
};

export default useAppNavigation;
