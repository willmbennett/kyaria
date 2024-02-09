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


async function getTest() {
  console.log('made it to flask test')
  try {

    const options = {
      method: 'GET',
      headers: { accept: 'application/json' },
    };

    console.log('options: ', options)

    const flaskServerUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5328/flask/test' : '/flask/test'
    
    const fetchResponse = await fetch(flaskServerUrl, options);

    if (!fetchResponse.ok) {
      return { error: 'Failed to fetch data from the Diffbot API.' }
    }

    const { message } = await fetchResponse.json();
    console.log('======= Fetrched Data (=======')
    console.log(message)
    //return { companyData: data[0].entity }
  } catch (error) {
    //console.error(error);
    return error
  }
}

export default async function ProfilePage() {
  const { activeSubscription, userId } = await checkSubscription()

  await getTest()

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
    <>
      <NetworkingInbox />
    </>
  );
}
