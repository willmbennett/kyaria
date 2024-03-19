'use client'
import { motion } from "framer-motion";
import { Container } from "../../landingpage/Container"
import { NewChatButton } from "../sidebar/NewChatButton";

export const ProductDemo = () => {

  const text = "Instead of selling you on Eve, we'll let her do the talking."
  const letters = Array.from(text);
  return (
    <section className="relative py-16 md:py-20 xl:py-32">
      <Container>
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
              <div className="w-full flex justify-center items-center">
                <div>
                  <NewChatButton userId={'n/a'} />
                </div>
              </div>
              <div className="flex justify-center items-center w-full max-w-6xl mx-auto">
                <div className="aspect-square w-full md:w-1/2 flex justify-center items-center relative rounded-lg shadow-lg">
                  <video src="https://ridlhxlqmhjlvpjy.public.blob.vercel-storage.com/eve-idle-4-JZARF2H2rNQGQCjItkov2Rk9oYqRKT" className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" autoPlay loop playsInline></video>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </Container>
    </section>
  )
}
