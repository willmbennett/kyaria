import { cache } from "react";
import { AppClass } from "../../../../models/App";
import { getJobApp } from "../../../../lib/app-db";
import { JobClass } from "../../../../models/Job";
import { JobStateType } from "../../../board/job-helper";
import useAppNavigation from "../../../../lib/hooks/use-app-section";
import ProgressBar from "../../../components/apps/ui/ProgressBar";
import JobMenu from "../../../components/apps/JobMenu";
import { JobAppLayoutWrapper } from "../../components/JobAppWrapper";


interface getJobAppInterface {
    app: AppClass
}

const loadJob = cache((id: string) => {
    return getJobApp(id)
})

export default async function AppLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {

    const { app } = await loadJob(params.id) as getJobAppInterface
    return (
        <JobAppLayoutWrapper
            appState={app.state as JobStateType}
            appId={app._id.toString()}
            boardId={app.boardId?.toString()}
        >
            {children}
        </JobAppLayoutWrapper>
    );
}