import ResumeBuilderHome from "../components/resumebuilder/ResumeBuilderHome";
import { getResumes } from "../../lib/resume-db";
import { ResumeClass } from "../../models/Resume";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";

type getResumesType = {
  resumes: ResumeClass[]
}

export default async function ProfilePage() {
  const { userId } = await checkSubscription()

  const { resumes } = await getResumes(userId) as getResumesType

  if (resumes.length == 0) {
    redirect('/resumebuilder/new')
  }

  redirect('/resumebuilder/' + resumes[0]._id.toString())

  return (
    <ResumeBuilderHome
      userId={userId}
      resumes={resumes}
    />
  );
}
