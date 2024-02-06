import { ResumeClass } from "../../../models/Resume";
import ResumeBuilderHome from "../resumebuilder/ResumeBuilderHome";

export const ProfileResumes = ({
    userId,
    resumes,
    activeSubscription
}: {
    resumes: ResumeClass[],
    userId: string,
    activeSubscription: boolean
}) => {

    return (
        <div className="flex w-full max-w-5xl mx-auto flex-col justify-center py-2 min-h-screen">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-8">
                Resume Section
            </h3>
            {resumes.length == 0 && <p>Welcome! To get started create a resume</p>}
            <ResumeBuilderHome
                userId={userId}
                resumes={resumes}
                activeSubscription={activeSubscription}
            />
        </div>
    );
}
