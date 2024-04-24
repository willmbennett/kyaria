'use client'
import { motion } from "framer-motion";
import { Container } from "../../landingpage/Container"

const ProductDemoCarousel = ({ createNew }: { createNew: () => Promise<any> }) => {

    const text = "Product Demo"
    const letters = Array.from(text);
    return (
        <div className="lg:px-4 lg:mt-6 w-full justify-center">
            <div className="flex flex-col items-center gap-10">
                <p className="flex items-center space-x-3.5 text-xl font-medium text-amber-900/70">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={3}
                        viewBox="0 0 28 3"
                        fill="none"
                    >
                        <line
                            y1="1.5"
                            x2={28}
                            y2="1.5"
                            stroke="currentColor"
                            strokeOpacity="0.65"
                            strokeWidth={3}
                        />
                    </svg>
                    <span>
                        {letters.map((letter, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {letter}
                            </motion.span>

                        ))}
                    </span>
                </p>
                <Container className='flex flex-col gap-4 w-full justify-center'>
                    <div className="flex justify-center items-center w-full max-w-6xl mx-auto">
                        <iframe width="1120" height="630" src="https://www.youtube.com/embed/tli4XnO2D6o?si=n81kSdknnb1_iuPB" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default ProductDemoCarousel;
