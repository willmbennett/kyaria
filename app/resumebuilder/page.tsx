import ResumeTest from "../components/resumebuilder/ResumeTest";
import Await from "../jobs/await";
import { ResumeScanDataClass } from "../../models/ResumeScan";
import { countTotalResumes, getResumes } from "../../lib/resume-db";
import { ResumeClass } from "../../models/Resume";
import { ResumeBuilderHero } from "../components/resumebuilder/landingpage/ResumeBuilderHero";
import { CallToAction } from "../components/resumebuilder/landingpage/CallToAction";
import { FeaturesGrid } from "../components/landingpage/FeaturesGrid";
import { Process } from "../components/resumebuilder/landingpage/Process";
import { FeatureBlocks } from "../components/resumebuilder/landingpage/FeatureBlocks";
import { Faqs } from "../components/resumebuilder/landingpage/Faqs";
import { checkSubscription } from "../../lib/hooks/check-subscription";

interface resumeTestProps {
  resumes: ResumeClass[],
  resumeScans: ResumeScanDataClass[]
}

export default async function ProfilePage() {
  const { activeSubscription, userId } = await checkSubscription()
  const { totalResumes } = await countTotalResumes()

  if (!userId) {
    return (
      <>
        <ResumeBuilderHero />
        <FeatureBlocks totalResumes={totalResumes || 200} />
        <Process />
        {/*<TestimonialsSlide />*/}
        <Faqs />
        <CallToAction />
      </>
    );
  }

  const resumesPromise = getResumes(userId)
  return (
    <>
      {/* @ts-expect-error Server Component */}
      < Await promise={resumesPromise}>
        {({ resumes, resumeScans }: resumeTestProps) =>
          <ResumeTest
            userId={userId}
            resumeScans={resumeScans}
            resumes={resumes} 
            activeSubscription={activeSubscription}
            />
        }
      </Await>
    </>
  );
}
