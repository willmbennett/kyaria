import { redirect } from "next/navigation";
import { NetworkingInbox } from "../../components/networking/NetworkingInbox";
import { checkSubscription } from "../../../lib/hooks/check-subscription";

export default async function ProfilePage() {
  const { activeSubscription, userId } = await checkSubscription()

  if (!userId || !activeSubscription) {
    redirect('/pricing')
  }

  return <NetworkingInbox />;
}
