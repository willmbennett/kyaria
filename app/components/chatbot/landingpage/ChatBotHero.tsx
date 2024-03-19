'use client'
import AuthButton from '../../AuthButton';
import { Container } from '../../landingpage/Container';
import { motion } from 'framer-motion';

export function ChatBotHero() {

  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 xl:pt-32">
      <Container>
        <div className="flex flex-col w-full gap-10 pb-14 md:pb-48 lg:pb-52 w-full xl:pb-14 justify-center items-center">
          <h1 className="text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl xl:mx-0 xl:text-6xl xl:leading-tighter text-center">
            Introducing <motion.span
              className="text-slate-500"
              initial={{ opacity: 0.5, y: -20, color: '#fef3c7' }} // Using HEX for amber-100
              animate={{ opacity: 1, y: 0, color: ['#fef3c7', '#64748b', '#fef3c7'] }} // Transition from amber-100 to slate-500 and back
              transition={{
                duration: 2, // Adjust duration as needed
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Eve
            </motion.span>, the world's first Virtual Career Coach
          </h1>
          <p className="mt-4 flex text-md text-slate-600/90 md:justify-center xl:justify-start xl:text-base">
            Included with Kyaria PRO subscription, only $10/mo.
          </p>
        </div>
      </Container>
    </section>
  );
}

