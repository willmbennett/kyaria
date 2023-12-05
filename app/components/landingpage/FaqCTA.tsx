import { Container } from './Container'
import { Button } from '../Button'

export function FaqCTA() {
  return (
    <section className="relative overflow-hidden bg-purple-light py-16 sm:py-20">
      <Container>
        <h1 className="text-center text-4xl font-semibold leading-snug text-slate-900 sm:text-5xl sm:leading-snug">
          See our FAQs
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-slate-700">
          Lorem ipsum dolor sit amet porta augue quisque enim. Vel ornare fames
          mauris dictumst aliqua purus praesent.
        </p>
        <div className="mt-10 flex w-full justify-center sm:mt-12">
          <Button href="/signin" variant="ghost">
            Go to FAQs
          </Button>
        </div>
      </Container>
    </section>
  )
}
