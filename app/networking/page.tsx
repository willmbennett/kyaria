import { CallToAction } from "../components/networking/CallToAction";
import { Faqs } from "../components/networking/Faqs";
import { FeatureBlocks } from "../components/networking/FeatureBlocks";
import { NetworkingDemo } from "../components/networking/NetworkingDemo";
import { NetworkingHero } from "../components/networking/NetworkingHero";
import { Process } from "../components/networking/Process";
import { StatsHighlight } from "../components/networking/StatsHighlight";

export default async function ProfilePage() {
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
