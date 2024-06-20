import { checkSubscription } from "../../lib/hooks/check-subscription";
import { AppClass } from "../../models/App";
import { Container } from "../components/landingpage/Container";
import { MockInterviewCreation } from "./components/MockInterviewCreation";
import { Button } from "../components/Button";
import { SidebarWrapper } from "../components/sidebar/SidebarWrapper";
import { createMockInterview, handleMockInterviewDeletion, loadApps } from "./_action";
import { getMockInterviewSidebarItems } from "./helper";
import { JobClass } from "../../models/Job";
import { InterviewTypeSelection } from "./components/InterviewTypeSelection";

export default async function MockInterviewPage() {
    const { userId } = await checkSubscription(true)

    const filter = {
        userId
    }

    const { jobApps } = await loadApps(filter) as { jobApps: AppClass[] }

    const items = getMockInterviewSidebarItems(jobApps)

    const appOptions = jobApps?.map(app => {
        const job = app.job as JobClass
        return ({
            id: app._id.toString(),
            label: job.jobTitle + (job.company && ' - ') + job.company
        })
    })

    const LeftElements = <InterviewTypeSelection />

    return (
        <SidebarWrapper
            userId={userId}
            sideBarTitle={'Jobs'}
            items={items}
            createNew={createMockInterview}
            newTitle={'New Mock Interview'}
            deleteItemAction={handleMockInterviewDeletion}
            leftElements={LeftElements}
        >
            <section className="flex overflow-hidden w-full h-full justify-center items-start pt-5 md:pt-10 lg:mt-15 xl:mt-24">
                <Container>
                    <div className="w-full max-w-3xl text-center p-4 flex flex-col gap-4">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            Start a new Mock Interview
                        </h1>
                        <p className="text-lg text-gray-600 ">Select which job you want to interview for. Our expert interviewer Eve will conduct a realistic mock interview for that role. We'll provide instant feedback upon completion based on a robust rubric.
                        </p>
                        <p className="text-sm text-gray-400 italic">
                            Note: Video responses will be recorded for the review.
                        </p>
                        {appOptions.length == 0 ?
                            <div>
                                <Button size="md" href="/apps/new" >Create a new App</Button>
                            </div>
                            :
                            <MockInterviewCreation appOptions={appOptions} />
                        }
                    </div>
                </Container>
            </section>
        </SidebarWrapper>
    )
}
