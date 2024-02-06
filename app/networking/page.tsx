import { redirect } from "next/navigation";
import { checkSubscription } from "../../lib/hooks/check-subscription";
import { CallToAction } from "../components/networking/CallToAction";
import { Faqs } from "../components/networking/Faqs";
import { FeatureBlocks } from "../components/networking/FeatureBlocks";
import NetworkingDemo from "../components/networking/NetworkingDemo";
import { NetworkingHero } from "../components/networking/NetworkingHero";
import { Process } from "../components/networking/Process";
import { StatsHighlight } from "../components/networking/StatsHighlight";
import { NetworkingInbox } from "../components/networking/NetworkingInbox";

export default async function ProfilePage() {
  const { activeSubscription, userId } = await checkSubscription()

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
    <NetworkingInbox />
  );
}
