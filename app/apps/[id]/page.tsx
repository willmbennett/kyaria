import { redirect } from "next/navigation";
import { JobAppPageProps } from "../app-helper";
import { checkSubscription } from "../../../lib/hooks/check-subscription";

export default async function JobAppPage({ params }: JobAppPageProps) {
  await checkSubscription(true)
  redirect(`${params.id}/jobdescription`)
}