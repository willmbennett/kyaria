import { redirect } from "next/navigation";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { CallToAction } from "../components/networking/landingpage/CallToAction";
import { Faqs } from "../components/networking/landingpage/Faqs";
import { FeatureBlocks } from "../components/networking/landingpage/FeatureBlocks";
import NetworkingDemo from "../components/networking/landingpage/NetworkingDemo";
import { NetworkingHero } from "../components/networking/landingpage/NetworkingHero";
import { Process } from "../components/networking/landingpage/Process";
import { StatsHighlight } from "../components/networking/landingpage/StatsHighlight";
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

  const stats = [
    { number: '250.7M', text: 'Organizations' },
    { number: '244+', text: 'Industries Represented' },
    { number: '99.9%', text: 'Employee Headcount Coverage' },
  ];

  return (
    <>
      <section className="flex w-full justify-center items-start pt-16 md:pt-20 xl:pt-32 min-h-screen bg-gradient-to-r from-white to-slate-400">
        <Container className="flex flex-col items-center justify-center w-full">
          <h1 className="text-5xl md:text-6xl lg:text-7xl pb-5 md:pb-10 lg:pb-16 font-bold leading-none text-center">
            Kyaria.ai Networking (beta)
          </h1>
          <div className="max-w-5xl w-full mb-10 p-4 md:p-6 lg:p-8 bg-white bg-opacity-90 rounded-xl shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300">
                  <span className="text-2xl md:text-3xl font-bold text-gray-800">{stat.number}</span>
                  <span className="mt-2 text-base text-gray-600">{stat.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-5xl w-full">
            <NetworkingSearch resumes={resumes} />
          </div>
        </Container>
      </section>
    </>

  );

}
