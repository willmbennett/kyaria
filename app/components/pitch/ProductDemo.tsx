import { Container } from "../landingpage/Container"
import ProductDemoCarousel from "./ProductDemoCarousel"

export default function ProductDemo() {

  return (
    <section className="relative py-16 md:py-20 xl:py-32">
      <Container>
        <ProductDemoCarousel />
      </Container>
    </section>
  )
}
