import ResumeBuilderHome from "../components/resumebuilder/ResumeBuilderHome";
import { countTotalResumes, getResume, getResumes } from "../../lib/resume-db";
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

type getResumesType = {
  resumes: ResumeClass[]
}

type getResumeType = {
  resume: ResumeClass
}

export default async function ProfilePage() {
  const { activeSubscription, userId } = await checkSubscription()
  const { totalResumes } = await countTotalResumes()
  const resumeId = '65adcbdf782ab1d399ea1aa4'
  const { resume } = await getResume(resumeId) as getResumeType

  if (!userId) {
    return (
      <>
        <ResumeBuilderHero />
        <ProductDemo resume={resume} resumeId={resumeId} />
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

  const { resumes } = await getResumes(userId) as getResumesType

  if (resumes.length == 0) {
    redirect('/resumebuilder/new')
  }

  return (
    <ResumeBuilderHome
      userId={userId}
      resumes={resumes}
      activeSubscription={activeSubscription}
    />
  );
}
