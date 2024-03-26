import { Container } from "../../landingpage/Container"
import ProductDemoCarousel from "./ProductDemoCarousel";

const ProductDemo = ({ createNew }: { createNew: () => Promise<any> }) => {
  return (
    <section className="relative pb-16 my:pb-20 xl:pb-32">
      <Container>
        <ProductDemoCarousel createNew={createNew} />
      </Container>
    </section>
  )
}

export default ProductDemo;
