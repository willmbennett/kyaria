import { Container } from './Container'

export function Announcement() {
  return (
    <section className="relative overflow-hidden py-10 bg-red-500/20">
      <Container>
            <h3 className="w-full text-lx md:text-xl lg:text-2xl text-center">
              Sadly we are shutting down this project, we appreciate all your support!
            </h3>
      </Container>
    </section>
  )
}
