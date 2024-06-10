import { cache } from "react";
import { AppClass } from "../../../../models/App";
import { getJobApp } from "../../../../lib/app-db";
import { JobStateType } from "../../../board/job-helper";
import { JobAppLayoutWrapper } from "../../components/JobAppWrapper";
import { checkSubscription } from "../../../../lib/hooks/check-subscription";


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
    await checkSubscription(true)

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