import ResumeBuilderHome from "../components/resumebuilder/ResumeBuilderHome";
import { countTotalResumes, getResumes } from "../../lib/resume-db";
import { ResumeClass } from "../../models/Resume";
import { ResumeBuilderHero } from "../components/resumebuilder/landingpage/ResumeBuilderHero";
import { CallToAction } from "../components/resumebuilder/landingpage/CallToAction";
import { FeaturesGrid } from "../components/landingpage/FeaturesGrid";
import { Process } from "../components/resumebuilder/landingpage/Process";
import { FeatureBlocks } from "../components/resumebuilder/landingpage/FeatureBlocks";
import { Faqs } from "../components/resumebuilder/landingpage/Faqs";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";
import { ProductDemo } from "../components/resumebuilder/landingpage/ProductDemo";

type resumeType = {
  resumes: ResumeClass[]
}

export default async function ProfilePage() {
  const { activeSubscription, userId } = await checkSubscription()
  const { totalResumes } = await countTotalResumes()
  const { resumes } = await getResumes(userId) as resumeType

  if (!userId) {
    return (
      <>
        <ResumeBuilderHero />
        <ProductDemo />
        <FeatureBlocks totalResumes={totalResumes || 200} />
        <Process />
        {/*<TestimonialsSlide />*/}
        <Faqs />
        <CallToAction />
      </>
    );
  }

  if (!activeSubscription) {
    redirect('/pricing')
  }

  return (
    <ResumeBuilderHome
      userId={userId}
      resumes={resumes}
      activeSubscription={activeSubscription}
    />
  );
}
