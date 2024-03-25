import { Container } from './Container'
import { CarouselType } from '../../helper';
import Carousel from './Carousel';
import dynamic from 'next/dynamic'
import ResumeDemo from '../resumebuilder/landingpage/ProductDemoCarousel'

const BoardDemo = dynamic(() => import('../board/landingpage/ProductDemoCarousel'))
const EveDemo = dynamic(() => import('../chatbot/landingpage/ProductDemoCarousel'))
const BioDemo = dynamic(() => import('../bio/ProductDemoCarousel'))
const PitchDemo = dynamic(() => import('../pitch/ProductDemoCarousel'))

export default function ProductCarousel({ createNew }: { createNew: () => Promise<any> }) {
  const items: CarouselType[] = [
    {
      name: 'eve',
      title: "Meet Eve: The World's First AI-Powered Career Coach",
      object: <EveDemo createNew={createNew} />
    },
    {
      name: 'board',
      title: 'Job Application Tracker',
      object: <BoardDemo />
    },
    {
      name: 'resumeBuilder',
      title: 'AI Powered Resume Builder',
      object:
        <>
          {/* @ts-ignore */}
          <ResumeDemo />
        </>
    },
    {
      name: 'bio',
      title: 'LinkedIn Bio Generator',
      object: <BioDemo />
    },
    {
      name: 'pitch',
      title: 'Elevator Pitch Generator',
      object: <PitchDemo />
    },
  ]

  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-32 lg:pb-28 lg:pt-24">
      <Container>
        {/* Carousel for larger screens */}
        <div className="hidden md:block">
          <Carousel items={items} />
        </div>

        {/* Scrolling objects for smaller screens */}
        <div className="md:hidden">
          {items.map((item, index) => (
            <div key={index} className="min-h-screen">
              <h2 className="mx-auto max-w-2xl text-center text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight">
                {item.title}
              </h2>
              <div className="mt-4">
                {item.object}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
