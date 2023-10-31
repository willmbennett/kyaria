import ResumeTest from "../components/resumetest/ResumeTest";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { getResumeScans } from "../../lib/resumescan-db";
import Await from "../jobs/await";
import { ResumeScanDataClass } from "../../models/ResumeScan";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  const promise = getResumeScans(session?.user?.id || '')

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <div className="flex flex-1 w-full flex-col items-center text-center lg:px-4">
        {/* @ts-expect-error Server Component */}
        <Await promise={promise}>
          {({ resumeScans }: { resumeScans: ResumeScanDataClass[]}) => <ResumeTest session={session} resumeScans={resumeScans} />}
        </Await>
      </div>
    </div>
  );
}
