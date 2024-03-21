import { Container } from "../../landingpage/Container"
import ProductDemoCarousel from "./ProductDemoCarousel"

export default function ProductDemo() {

  return (
    <section className="relative pt-16 md:pt-20 xl:pt-32">
      <Container>
        <ProductDemoCarousel />
      </Container>
    </section>
  )
}
