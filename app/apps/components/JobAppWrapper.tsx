'use client'
import useAppNavigation from "../../../lib/hooks/use-app-section";
import ProgressBar from "../../components/apps/ui/ProgressBar";
import JobMenu from "../../components/apps/JobMenu";
import { JobStateType } from "../../board/job-helper";

export const JobAppLayoutWrapper = ({
    appState,
    appId,
    boardId,
    children
}: {
    appState: JobStateType;
    appId: string;
    boardId?: string;
    children: React.ReactNode;
}) => {
    const { activeProgressSection, filteredPages } = useAppNavigation(appId, appState);
    return (
        <div className="relative w-full h-full">
            <ProgressBar
                activeProgressSection={activeProgressSection}
            />
            <div className="flex w-full h-full gap-2 pt-12">
                <div className="pl-1 md:pl-2 lg:pl-3 xl:pl-4 pt-10">
                    <JobMenu
                        appId={appId}
                        boardId={boardId}
                        filteredPages={filteredPages}
                        activeProgressSection={activeProgressSection}
                    />
                </div>
                <div className="flex-grow w-full h-full overflow-y-scroll">
                    <div className="py-10 w-full flex justify-center">
                        {children}
                    </div>
                </div>
            </div >
        </div>
    );
}