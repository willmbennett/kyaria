import { checkSubscription } from "../../../lib/hooks/check-subscription";
import NewResumeForm from "../../components/resumebuilder/new/NewResumeForm";
import { Container } from "../../components/landingpage/Container";

export default async function ResumeUploadPage() {
    const { userId } = await checkSubscription(true)

    return (
        <section className="flex w-full justify-center py-5 md:py-8 lg:py-10">
            <Container>
                <div className="flex flex-col gap-10 text-center">
                    <h1 className="text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-left xl:text-6xl xl:leading-tighter">
                        Create a new resume
                    </h1>
                    <NewResumeForm userId={userId} />
                </div>
            </Container>
        </section>
    );
}
