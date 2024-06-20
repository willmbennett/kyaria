"use client";
import { motion } from "framer-motion";
import { Container } from "./Container";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import intervieweeImg from "/public/images/avatars/team-03.jpg";
import interviewerImg from "/public/images/eve-1.jpg";
import headshot from "/public/images/eve-headshot.png";
import { VideoCameraIcon, MicrophoneIcon, CogIcon } from "@heroicons/react/24/solid";
import GradingVisual from "../mockinterviews/GradingVisual";

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export const MockInterviewDemo: React.FC = () => {
    const [triggerAnimation, setTriggerAnimation] = useState(false);
    const [animationKey, setAnimationKey] = useState(0); // To force re-render

    const handleStartClick = () => {
        setTriggerAnimation(true);
    };

    const handleResetClick = () => {
        setTriggerAnimation(false);
        setAnimationKey((prevKey) => prevKey + 1); // Increment key to force re-render
    };

    const messages: Message[] = [
        { role: 'assistant', content: "Hi Will, welcome to your mock phone screen. I'll be your interviewer, Eve" },
        { role: 'assistant', content: 'Can you tell me about a time you overcame a challenge at work?' },
        { role: 'user', content: 'Sure, there was a project where we were behind schedule. I organized daily stand-ups to align everyone and we completed the project on time.' },
        { role: 'assistant', content: 'That’s impressive! How did the daily stand-ups help in aligning your team and meeting the project deadline?' }
    ];

    const initialMessages = messages.slice(0, 3);
    const streamingText = Array.from(messages[3].content);

    return (
        <section className="relative overflow-hidden pt-16 md:pt-20 xl:pt-32">
            <Container className="flex w-full justify-center">
                <div className="flex flex-col items-center mx-auto max-w-lg pb-14 md:mx-0 md:max-w-none md:pb-48 lg:pb-52 xl:max-w-3xl xl:pb-24">
                    <h1 className="text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl text-center xl:mx-0 xl:text-6xl xl:leading-tighter">
                        Experience a Realistic Mock Interview with Eve
                    </h1>
                    <p className="mt-6 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg text-center">
                        Our AI-powered platform provides you with an interactive mock interview experience to help you ace your next job interview.
                    </p>
                    <div className="mt-4 space-x-4">
                        <button
                            onClick={handleStartClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Start Animation
                        </button>
                        <button
                            onClick={handleResetClick}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Reset Animation
                        </button>
                    </div>
                </div>
            </Container>

            <Container className="flex w-full bg-slate-600 p-10">
                <div className="mx-auto max-w-7xl h-52 md:h-auto shadow-lg flex flex-grow flex rounded-xl" key={animationKey}>
                    <div className="relative w-full bg-black p-2 rounded-l-xl h-min">
                        <div className="relative w-full h-auto aspect-video flex justify-center items-center rounded-l-lg shadow-lg bg-white">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: triggerAnimation ? 1 : 0 }}
                                transition={{ duration: 1 }}
                                className="relative aspect-[3/4] h-full"
                            >
                                <Image
                                    src={interviewerImg}
                                    alt="Interviewer"
                                    className="absolute z-10 top-0 left-0 w-full h-full aspect-square object-cover rounded-lg"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: triggerAnimation ? 1 : 0, y: triggerAnimation ? -100 : 100 }}
                                transition={{ duration: 2 }}
                                className="absolute top-20 left-12 bg-white w-48 z-20 rounded-xl shadow py-3 px-2"
                            >
                                <div className="flex flex-col justify-center items w-full">
                                    <GradingVisual overallScore={9} />
                                    <p className="mt-2 text-center text-slate-700">Great job! You demonstrated excellent problem-solving skills and effective team communication. Keep up the good work!</p>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: triggerAnimation ? 1 : 0 }}
                                transition={{ duration: 1 }}
                                className="z-20 aspect-video absolute bottom-4 right-4 w-12 md:w-32 lg:w-48 border-2 border-white rounded-lg shadow-lg overflow-hidden"
                            >
                                <Image
                                    src={intervieweeImg}
                                    alt="Interviewee"
                                    className="w-full object-cover rounded-lg"
                                />
                            </motion.div>
                        </div>
                        <div className="flex justify-center gap-2 my-2">
                            <VideoCameraIcon className="h-6 w-6 text-white" />
                            <MicrophoneIcon className="h-6 w-6 text-white" />
                            <CogIcon className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <div className="relative w-1/4 md:w-1/3 lg:w-1/4 bg-white flex flex-col p-4 rounded-r-xl h-full overflow-hidden">
                        {initialMessages.map((m, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: triggerAnimation ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                                className="relative text-left text-xs md:text-sm lg:text-base mb-2"
                            >
                                <div className="flex items-start">
                                    <div className="flex size-[10px] md:size-[25px] shrink-0 select-none items-center justify-center rounded-full">
                                        <Image
                                            src={m.role === 'user' ? intervieweeImg : headshot}
                                            alt={m.role === 'user' ? 'User' : 'Assistant'}
                                            className="object-cover rounded-full border"
                                        />
                                    </div>
                                    <div className="ml-2 flex-grow space-y-2 overflow-hidden text-slate-700">
                                        {m.content}
                                    </div>
                                </div>
                                <Separator className="my-2 border-b h-1" />
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: triggerAnimation ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative text-left text-xs md:text-sm lg:text-base mb-2"
                        >
                            <div className="flex items-start">
                                <div className="flex size-[10px] md:size-[25px] shrink-0 select-none items-center justify-center rounded-full">
                                    <Image
                                        src={headshot}
                                        alt="Assistant"
                                        className="object-cover rounded-full border"
                                    />
                                </div>
                                <div className="ml-2 flex-grow space-y-2 overflow-hidden text-slate-700">
                                    {streamingText.map((letter, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: triggerAnimation ? 1 : 0, y: triggerAnimation ? 0 : -10 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
};