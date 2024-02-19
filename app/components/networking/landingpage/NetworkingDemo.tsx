'use client'
import React, { useState, useEffect, useRef } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Avatar from '/public/images/avatars/team-03.jpg'
import Avatar1 from '/public/images/avatars/team-01.jpg'
import Avatar2 from '/public/images/avatars/avatar-01.jpg'
import Avatar3 from '/public/images/avatars/team-02.jpg'
import { Container } from '../../landingpage/Container';

// Existing mockEmployees array with an additional entry

const person = {
    id: '1',
    name: 'Will Edwards',
    title: 'Computer Science Graduate',
}
const mockEmployees = [
    {
        id: '1',
        name: 'Jane Doe',
        title: 'Software Engineer at Google',
        message: "I see you work with Google Assistant. Do you know Mark? I'd love to chat about your process?",
    },
    {
        id: '2',
        name: 'Jordan Taylor',
        title: 'Software Engineer at Meta',
        message: "I'm fascinated by your React Native work at Meta, as I've worked with it for years. Open to sharing insights?",
    },
    {
        id: '3',
        name: 'Sam Patel',
        title: 'Software Engineer at SpaceX',
        message: "I just watched Elon give a talk about Starlink. Can you share some challenges faced?",
    },
];



function NetworkingDemo() {
    const [isVisible, setIsVisible] = useState(false); // user can see the section
    const bottomRef = useRef(null); // Ref for the first step div

    const [step, setStep] = useState(1);
    const [showStep1, setShowStep1] = useState(false);
    const [showStep2, setShowStep2] = useState(false);
    const [showStep3, setShowStep3] = useState(false);
    const [showStep4, setShowStep4] = useState(false);
    const [showStep5, setShowStep5] = useState(false);
    const [sending, setSending] = useState(false);
    const [currentOpportunityIndex, setCurrentOpportunityIndex] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            // Assuming only one target is observed
            const [entry] = entries;
            setIsVisible(entry.isIntersecting);
        });

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => {
            if (bottomRef.current) {
                observer.unobserve(bottomRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let timer1, timer2, timer3;
        if (isVisible) {
            setTimeout(() => setShowStep1(true), 200); // Delay the fade-in effect

            // Trigger fade-in effect after moving to the new step
            if (step === 1) {
                timer1 = setTimeout(() => setShowStep2(true), 3100); // Delay the fade-in effect
                timer2 = setTimeout(() => setStep(2), 3000);
                timer3 = setTimeout(() => setShowStep1(false), 2900); // Fade out the first one
            } else if (step === 2) {
                timer1 = setTimeout(() => setShowStep3(true), 3100); // Adjust these delays as needed
                timer2 = setTimeout(() => setStep(3), 3000);
                timer3 = setTimeout(() => setShowStep2(false), 2900); // Fade out the first one
            } else if (step === 3) {
                timer2 = setTimeout(() => setStep(4), 2000);
                timer3 = setTimeout(() => setShowStep4(true), 2000); // Fade out the first one
            } else if (step === 4) {
                timer1 = setTimeout(() => setShowStep5(true), 2100);
                timer2 = setTimeout(() => setStep(5), 2000);
                timer3 = setTimeout(() => setShowStep4(false), 1900); // Fade out the first one
            }

        }
    }, [step, isVisible]);

    useEffect(() => {
        if (step === 5 && currentOpportunityIndex < mockEmployees.length) {
            setSending(true);
            const timer = setTimeout(() => {
                setSending(false);
                setCurrentOpportunityIndex(currentOpportunityIndex + 1);
            }, 2000); // Simulate sending for 2 seconds
            return () => clearTimeout(timer);
        }
    }, [step, currentOpportunityIndex, mockEmployees.length]);


    return (
        <section className="w-full text-center py-8 md:py-10 xl:py-16 space-y-4">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">Kyaria's Networking AI
            </h1>
            <Container className='flex w-full justify-center'>
                <div className='flex w-full items-center justify-center'>
                    <div className={`h-96 transition-opacity justify-center items-center duration-500 ${step === 1 ? 'block' : 'hidden'} ${showStep1 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex flex-col space-y-4 w-full text-center justify-center items-center">
                            <h2 className="text-xl md:text-2xl font-semibold">Step 1: You</h2>
                            <div className="flex space-y-4">
                                <div key={person.id} className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden m-4">
                                    <div className="flex justify-center mt-5">
                                        <Image className="rounded-full w-32 h-32 object-cover" src={Avatar} alt={`${person.name}'s profile picture`} />
                                    </div>
                                    <div className="p-5">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 text-center">{person.name}</h5>
                                        <p className="text-gray-700 dark:text-gray-400 mt-2 text-center">{person.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`h-96 transition-opacity justify-center items-center duration-500 ${step === 2 ? 'block' : 'hidden'} ${showStep2 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-center h-full">
                            <h2 className="text-xl md:text-2xl font-semibold">Step 2: Your Goal</h2>
                            <div className='flex h-full justify-center items-center'>
                                <p className="text-gray-700 dark:text-gray-400">Get a job as an entry-level software engineer</p>
                            </div>
                        </div>
                    </div>
                    {/* New Loading Step */}
                    <div className={`h-96 transition-opacity justify-center items-center duration-500 ${step === 3 ? 'block' : 'hidden'} ${showStep3 ? 'opacity-100' : 'opacity-0'}`}>
                        <h2 className="text-xl md:text-2xl font-semibold">Step 3: Kyaria's AI</h2>
                        <div className='flex h-full justify-center items-center'>
                            <div className="flex justify-center items-center space-x-2 mt-4">
                                <p className="text-gray-700 dark:text-gray-400">Finding the best networking opportunities</p>
                                {/* Placeholder for a loading animation */}
                                <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={`h-96 transition-opacity justify-center items-center duration-500 ${step === 4 ? 'block' : 'hidden'} ${showStep4 ? 'opacity-100' : 'opacity-0'}`}>
                        <h2 className="text-xl md:text-2xl font-semibold">Step 3: Kyaria's AI</h2>
                        <div className='flex h-full justify-center items-center'>
                            <div className="flex justify-center items-center space-x-2 mt-4">
                                {/* Placeholder for a loading animation */}
                                <p className="text-gray-700 dark:text-gray-400">Crafting personalized messages</p>
                                {/* Placeholder for a loading animation */}
                                <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* Networking Opportunities Step */}
                    <div className={`transition-opacity w-full justify-center items-center duration-500 ${step === 5 ? 'block' : 'hidden'} ${showStep5 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="space-y-4 w-full text-center">
                            <h2 className="text-xl md:text-2xl font-semibold">Step 4: Auto-network</h2>
                            <div className='flex flex-col md:flex-row w-full justify-start md:space-x-2 space-y-2 md:space-y-0'>
                                {mockEmployees.map((employee, index) => (
                                    // This extra div acts as a flex item controller
                                    <div key={employee.id} className={`flex w-full md:w-1/3 transition-opacity ${index <= currentOpportunityIndex ? 'md:opacity-100' : 'hidden md:visible md:opacity-0'}`}>
                                        <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex flex-col">
                                            <div className="flex justify-center mt-5">
                                                <Image className="rounded-full w-32 h-32 object-cover" src={index === 0 ? Avatar1 : index === 1 ? Avatar2 : Avatar3} alt={`${employee.name}'s profile picture`} width={128} height={128} />
                                            </div>
                                            <div className="p-5 flex flex-col justify-between">
                                                <div>
                                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 text-center">{employee.name}</h5>
                                                    <p className="text-gray-700 dark:text-gray-400 mt-2 text-center">{employee.title}</p>
                                                </div>
                                                {index === currentOpportunityIndex && sending ? (<div className='space-y-2'>
                                                    <div className="flex justify-center items-center space-x-2 mt-4">
                                                        <p className="text-gray-700 dark:text-gray-400">Message Sending</p>
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                ) : (
                                                    <div className="flex justify-center space-x-2 mt-4">
                                                        <p className="text-gray-700 dark:text-gray-400">Message Sent</p>
                                                        <CheckCircleIcon className="h-6 w-6 text-green-500" />
                                                    </div>
                                                )}
                                                <p>{employee.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div ref={bottomRef}></div>
        </section >
    );
}

export default NetworkingDemo;
