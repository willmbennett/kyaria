import { redirect } from "next/navigation";
import { JobAppPageProps } from "../app-helper";

export default async function JobAppPage({ params }: JobAppPageProps) {
  redirect(`${params.id}/jobdescription`)
}