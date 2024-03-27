import dynamic from 'next/dynamic';
import ResumeBuilderHome from "../components/resumebuilder/ResumeBuilderHome";
import { countTotalResumes, getResume, getResumes } from "../../lib/resume-db";
import { ResumeClass } from "../../models/Resume";
import { ResumeBuilderHero } from "../components/resumebuilder/landingpage/ResumeBuilderHero";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";

// Dynamically import components
const CallToAction = dynamic(() => import("../components/resumebuilder/landingpage/CallToAction"), {
  ssr: false,
});
//const FeaturesGrid = dynamic(() => import("../components/landingpage/FeaturesGrid"));
const Process = dynamic(() => import("../components/resumebuilder/landingpage/Process"), {
  ssr: false,
});
const FeatureBlocks = dynamic(() => import("../components/resumebuilder/landingpage/FeatureBlocks"), {
  ssr: false,
});
const Faqs = dynamic(() => import("../components/resumebuilder/landingpage/Faqs"), {
  ssr: false,
});
const ProductDemo = dynamic(() => import("../components/resumebuilder/landingpage/ProductDemo"), {
  ssr: false,
});


type getResumesType = {
  resumes: ResumeClass[]
}

type getResumeType = {
  resume: ResumeClass
}

export default async function ProfilePage() {
  const { userId } = await checkSubscription()
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
