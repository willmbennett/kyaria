import ResumeTest from "../components/resumebuilder/ResumeTest";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Await from "../jobs/await";
import { ResumeScanDataClass } from "../../models/ResumeScan";
import { getResumes } from "../../lib/resume-db";
import { ResumeClass } from "../../models/Resume";
import { ResumeBuilderHero } from "../components/resumebuilder/ResumeBuilderHero";
import { CallToAction } from "../components/landingpage/CallToAction";
import { Faqs } from "../components/landingpage/Faqs";
import { FeaturesGrid } from "../components/landingpage/FeaturesGrid";
import { Process } from "../components/resumebuilder/landingpage/Process";
import { FeatureBlocks } from "../components/resumebuilder/landingpage/FeatureBlocks";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id
  //const userId = '651c521bb37b5e173811e79e'

  if (!userId) {
    return (
      <div className="w-screen min-h-screen">
        <ResumeBuilderHero />
        <FeatureBlocks />
        <Process />
        {/*<TestimonialsSlide />*/}
        <Faqs />
        <CallToAction />
      </div >
    );
  }
  const resumesPromise = getResumes(userId)
  return (
    <div className="w-screen min-h-screen">
      {userId && <>
        {/* @ts-expect-error Server Component */}
        < Await promise={resumesPromise}>
          {({ resumes, resumeScans }: { resumes: ResumeClass[], resumeScans: ResumeScanDataClass[] }) => <ResumeTest userId={userId} resumeScans={resumeScans} resumes={resumes} />}
        </Await>
      </>}
    </div >
  );
}
