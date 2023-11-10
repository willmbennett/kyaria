import ResumeTest from "../components/resumetest/ResumeTest";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { getResumeScans } from "../../lib/resumescan-db";
import Await from "../jobs/await";
import { ResumeScanDataClass } from "../../models/ResumeScan";
import FeedbackAside from "../components/FeedbackAside";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  const promise = getResumeScans(session?.user?.id || '650f813286f63a9d8c0080ee')

  return (
    <div className="flex flex-col w-full md:flex-row justify-center">
      <div className="flex flex-col max-w-5xl md:flex-row py-2 min-h-screen lg:px-4 lg:mt-6">
        {/* @ts-expect-error Server Component */}
        <Await promise={promise}>
          {({ resumeScans }: { resumeScans: ResumeScanDataClass[] }) => <ResumeTest session={session} resumeScans={resumeScans} />}
        </Await>
      </div>
      <div>
        <FeedbackAside />
      </div>
    </div>
  );
}
