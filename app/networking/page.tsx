import { redirect } from "next/navigation";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { CallToAction } from "../components/networking/CallToAction";
import { Faqs } from "../components/networking/Faqs";
import { FeatureBlocks } from "../components/networking/FeatureBlocks";
import NetworkingDemo from "../components/networking/NetworkingDemo";
import { NetworkingHero } from "../components/networking/NetworkingHero";
import { Process } from "../components/networking/Process";
import { StatsHighlight } from "../components/networking/StatsHighlight";
import NetworkingSearch from "../components/networking/NetworkingSearch";
import { getResumes } from "../../lib/resume-db";
import { ResumeClass } from "../../models/Resume";
import ResumeListMenu from "../components/resumebuilder/ResumeMenu";
import { Container } from "../components/landingpage/Container";

export default async function NetworkingPage() {
  const { activeSubscription, userId } = await checkSubscription()
  const { resumes } = await getResumes(userId) as { resumes: ResumeClass[] }

  //await getTest()

  if (!userId) {
    return (
      <>
        <NetworkingHero />
        <NetworkingDemo />
        <StatsHighlight />
        <FeatureBlocks />
        <Process />
        {/*<TestimonialsSlide />*/}
        {/*<Faqs />*/}
        <CallToAction />
      </>
    );
  }

  if (!activeSubscription) {
    redirect('/pricing')
  }

  return (
    <section className="flex w-full justify-center pt-16 md:pt-20 xl:pt-32">
      {/* Hero section content */}
      <Container className="flex flex-col justify-center w-full">
        {/* Hero text and buttons */}
        <h1 className="text-5xl pb-5 md:pb-10 lg:pb-16 font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-left xl:text-6xl xl:leading-tighter">
          Networking
        </h1>
        <div className="flex flex-col max-w-5xl w-full items-center justify-center">
          <NetworkingSearch resumes={resumes} />
        </div>
      </Container>
    </section>
  );

}
