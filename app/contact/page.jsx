import { ContactHeader } from '../components/ContactHeader'
import { ContactInfo } from '../components/ContactInfo'
import { Map } from '../components/Map'
import { FaqCTA } from '../components/FaqCTA'
import { CallToAction } from '../components/CallToAction'

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
