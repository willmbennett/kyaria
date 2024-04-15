'use client'
import { Container } from '../../landingpage/Container';
import { motion } from 'framer-motion';
import { useCountUpAnimation } from '../../../../lib/chatbot/useAnimatedNumber';
import AuthButton from '../../AuthButton';

interface ChatBotHeroProps {
  numChats?: number;
  numChatUsers?: number;
}

export function ChatBotHero({
  numChats = 0, // Defaulting to 0 if not provided
  numChatUsers = 0, // Defaulting to 0 if not provided
}: ChatBotHeroProps) {

  const animatedNumChats = useCountUpAnimation(numChats);
  const animatedNumChatUsers = useCountUpAnimation(numChatUsers);

  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 xl:pt-32">
      <Container>
        <div className="flex flex-col w-full gap-10 pb-14 md:pb-48 lg:pb-52 xl:pb-14 justify-center items-center">
          {/* Title and Introduction */}
          <h1 className="text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl xl:text-6xl xl:leading-tighter text-center">
            Introducing <motion.span
              className="text-slate-500"
              initial={{ opacity: 0.5, y: -20, color: '#fef3c7' }}
              animate={{ opacity: 1, y: 0, color: ['#fef3c7', '#64748b', '#fef3c7'] }}
              transition={{
                duration: 2,
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
          <div className="mt-10 flex flex-col sm:flex-row sm:space-x-5 md:mt-12 md:justify-center xl:justify-start">
            <AuthButton altText="Start Chatting" />
          </div>
          <p className="mt-4 flex text-md text-slate-600/90 md:justify-center xl:justify-start xl:text-base">
            Included with Kyaria PRO subscription, only $10/mo.
          </p>

          {/* Animated Counters */}
          {false &&
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <span className="block text-4xl font-bold text-slate-700">
                  {animatedNumChats}
                </span>
                <span className="text-lg text-slate-600/90">Chats</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-bold text-slate-700">
                  {animatedNumChatUsers}
                </span>
                <span className="text-lg text-slate-600/90">Users</span>
              </div>
            </div>
          }
        </div>
      </Container>
    </section>
  );
}
