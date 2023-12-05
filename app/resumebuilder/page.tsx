import ResumeTest from "../components/resumebuilder/ResumeTest";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Await from "../jobs/await";
import { ResumeScanDataClass } from "../../models/ResumeScan";
import { getResumes } from "../../lib/resume-db";
import { ResumeClass } from "../../models/Resume";
import { ResumeBuilderHero } from "../components/resumebuilder/ResumeBuilderHero";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const resumesPromise = getResumes(session?.user?.id || '650f813286f63a9d8c0080ee')

  return (
    <div className="flex w-full min-h-screen justify-center">
      {!session?.user?.id && ResumeBuilderHero()}
      {session?.user?.id && <>
        {/* @ts-expect-error Server Component */}
        < Await promise={resumesPromise}>
          {({ resumes, resumeScans }: { resumes: ResumeClass[], resumeScans: ResumeScanDataClass[] }) => <ResumeTest session={session} resumeScans={resumeScans} resumes={resumes} />}
        </Await>
      </>}
    </div >
  );
}
