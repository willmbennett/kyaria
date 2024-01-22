import { redirect } from "next/navigation";
import { checkSubscription } from "../../../lib/hooks/check-subscription";
import NewResumeForm from "../../components/resumebuilder/new/NewResumeForm";

export default async function ProfilePage() {
    const { activeSubscription, userId } = await checkSubscription()

    if (!userId || !activeSubscription) {
        redirect('/');
    }
    return (
        <div className="flex w-full justify-center">
            <div className="max-w-5xl p-4">
                <NewResumeForm userId={userId} />
            </div>
        </div>
    );
}
