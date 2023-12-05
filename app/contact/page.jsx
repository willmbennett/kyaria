import { ContactHeader } from '../components/landingpage/ontactHeader'
import { ContactInfo } from '../components/landingpage/ContactInfo'
import { Map } from '../components/landingpage/Map'
import { FaqCTA } from '../components/landingpage/FaqCTA'
import { CallToAction } from '../components/landingpage/CallToAction'

export const metadata = {
  title: 'Wavvy - Contact',
  description:
    'Our dedicated customer service team is ready to assist with all your podcasting needs, ensuring a seamless and hassle-free experience.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHeader />
      <ContactInfo />
      <Map />
      <FaqCTA />
      <CallToAction />
    </>
  )
}
