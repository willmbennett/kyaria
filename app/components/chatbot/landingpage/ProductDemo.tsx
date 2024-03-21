import { Container } from "../../landingpage/Container"
import ProductDemoCarousel from "./ProductDemoCarousel";

const ProductDemo = () => {
  return (
    <section className="relative pb-16 my:pb-20 xl:pb-32">
      <Container>
        <ProductDemoCarousel />
      </Container>
    </section>
  )
}

export default ProductDemo;
