import dynamic from 'next/dynamic';
import { NetworkingHero } from "../components/networking/NetworkingHero";
import { redirect } from "next/navigation";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { getResumes } from "../../lib/resume-db";
import { ResumeClass } from "../../models/Resume";
import { Container } from '../components/landingpage/Container';

// Dynamically import components
const CallToAction = dynamic(() => import("../components/networking/CallToAction"), {
  ssr: false,
});
const Faqs = dynamic(() => import("../components/networking/Faqs"), {
  ssr: false,
});
const FeatureBlocks = dynamic(() => import("../components/networking/FeatureBlocks"), {
  ssr: false,
});
const NetworkingDemo = dynamic(() => import("../components/networking/NetworkingDemo"), {
  ssr: false,
});
const Process = dynamic(() => import("../components/networking/Process"), {
  ssr: false,
});
const NetworkingSearch = dynamic(() => import("../components/networking/NetworkingSearch"), {
  ssr: false,
});
const StatsHighlight = dynamic(() => import("../components/networking/landingpage/StatsHighlight"), {
  ssr: false,
});


export default async function NetworkingPage() {
  const { activeSubscription, userId } = await checkSubscription()

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

  const { resumes } = await getResumes(userId) as { resumes: ResumeClass[] }

  return (
    <>
      <section className="flex w-full justify-center items-start pt-16 md:pt-20 xl:pt-32 min-h-screen bg-gradient-to-r from-white to-slate-400">
        <Container className="flex flex-col items-center justify-center w-full">
          <h1 className="text-5xl md:text-6xl lg:text-7xl pb-2 md:pb-5 lg:pb-8 font-bold leading-none text-center">
            Kyaria.ai Networking (beta)
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 pb-2 md:pb-5 lg:pb-8">Set up an ai-powered networking campaign to automatically network for you.</p>
          <div className="max-w-5xl w-full mb-10 pt-4 px-4 md:pt-6 md:px-6 lg:pt-8 md:px-8 bg-white bg-opacity-90 rounded-xl shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300">
                  <span className="text-2xl md:text-3xl font-bold text-gray-800">{stat.number}</span>
                  <span className="mt-2 text-base text-gray-600">{stat.text}</span>
                </div>
              ))}
            </div>
            <div className="py-2 lg:py-4 w-fill text-center">
              <p className="text-slate-600">Powered by <a href="https://www.diffbot.com/" className="text-slate-900 font-medium underline">DiffBot</a></p>
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
