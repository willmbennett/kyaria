import ResumeBuilderHome from "../components/resumebuilder/ResumeBuilderHome";
import Await from "../jobs/await";
import { countTotalResumes, getResumes } from "../../lib/resume-db";
import { ResumeClass } from "../../models/Resume";
import { ResumeBuilderHero } from "../components/resumebuilder/landingpage/ResumeBuilderHero";
import { CallToAction } from "../components/resumebuilder/landingpage/CallToAction";
import { FeaturesGrid } from "../components/landingpage/FeaturesGrid";
import { Process } from "../components/resumebuilder/landingpage/Process";
import { FeatureBlocks } from "../components/resumebuilder/landingpage/FeatureBlocks";
import { Faqs } from "../components/resumebuilder/landingpage/Faqs";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { redirect, RedirectType } from "next/navigation";
import { ProductDemo } from "../components/resumebuilder/landingpage/ProductDemo";

export default async function ProfilePage() {
  const { activeSubscription, userId } = await checkSubscription()
  const { totalResumes } = await countTotalResumes()
  const resumesPromise = getResumes(userId)

  if (!userId) {
    return (
      <>
        <ResumeBuilderHero />
        {/* @ts-expect-error Server Component */}
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
    <>
      {/* @ts-expect-error Server Component */}
      < Await promise={resumesPromise}>
        {({ resumes }: { resumes: ResumeClass[] }) => {

          //If the user doesn't have any resumes send them to the new page
          if (!resumes) {
            redirect('resumebuilder/new', 'replace' as RedirectType)
          }

          return (
            <ResumeBuilderHome
              userId={userId}
              resumes={resumes}
              activeSubscription={activeSubscription}
            />
          )
        }}
      </Await>
    </>
  );
}
