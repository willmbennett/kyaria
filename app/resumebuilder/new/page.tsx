import { redirect } from "next/navigation";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import NewResumeForm from "../../components/resumebuilder/new/NewResumeForm";

export default async function ResumeUploadPage() {
    const { activeSubscription, userId } = await checkSubscription()

    if (!userId || !activeSubscription) {
        redirect('/');
    }
    
    return (
        <div className="w-full justify-center">
            <NewResumeForm userId={userId} />
        </div>
    );
}
