'use client'
import Link from 'next/link';
import { Chat } from '../chatbot/Chat';
import { Message } from 'ai';
import { VideoPlayer } from './VideoPlayer';
import { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';
import { InterviewGrades } from './InterviewGrading';
import { getFeedback } from '../../mockinterviews/[id]/_action';
import { usePathname, useRouter } from 'next/navigation';
import GradingVisual from './GradingVisual';
import { AnimatePresence, motion } from 'framer-motion';

interface MockInterviewsProps {
    id: string;
    name: string;
    questions: string[];
    messages: Message[];
    recordings: { link: string | undefined; createdTimeStamp: string | undefined; }[];
    interviewScores: {
        question: string;
        explanation: string; // Added explanation field
        score: number
    }[]
}

export const MockInterviews = ({ id, name, questions, messages, recordings, interviewScores }: MockInterviewsProps) => {
    const path = usePathname()
    const router = useRouter()
    const numRecordings = recordings.length
    const numMessages = messages.length
    const defaultVideo = numRecordings > 0 ? recordings[0] : null;
    const defaultMessage = numMessages > 0 ? messages.filter(m => m.role == 'assistant')[0] : null;
    const [currentVideo, setCurrentVideo] = useState(defaultVideo)
    const [currentMessage, setCurrentMessage] = useState(defaultMessage)
    const [currentGrading, setCurrentGrading] = useState(interviewScores[0])

    const questionMessageIndices = questions.map(q => {
        const foundMessage = messages.find(m => m.content.includes(q));
        return foundMessage ? messages.indexOf(foundMessage) : -1;
    }).filter(index => index !== -1);

    const [currentQuestion, setCurrentQuestion] = useState(0)

    const handleMessageClick = (message: Message) => {
        if (message != currentMessage) setCurrentMessage(message)
        const foundVideo = recordings.find(r => (r.createdTimeStamp && message?.createdAt) && new Date(r.createdTimeStamp) > message?.createdAt)
        if (foundVideo && foundVideo != currentVideo) {
            setCurrentVideo(foundVideo)
        }
    }

    const goToNext = () => {
        let currentMessageIndex;
        if (currentMessage) {
            currentMessageIndex = messages.indexOf(currentMessage);
        } else {
            currentMessageIndex = numMessages - 1;
        }

        if (currentMessageIndex != -1) {
            let nextMessageIndex = currentMessageIndex + 1;
            while (nextMessageIndex < numMessages && messages[nextMessageIndex].role !== 'assistant') {
                nextMessageIndex++;
            }
            if (nextMessageIndex < numMessages) {
                setCurrentMessage(messages[nextMessageIndex]);
            }
        }

        let currentVideoIndex;
        if (currentVideo) {
            currentVideoIndex = recordings.indexOf(currentVideo);
        } else {
            currentVideoIndex = numRecordings - 1;
        }

        if (currentVideoIndex != -1 && currentVideoIndex < numRecordings - 1) {
            setCurrentVideo(recordings[currentVideoIndex + 1]);
        }
    };

    useEffect(() => {
        if (!currentMessage) return
        const currentMessageIndex = messages.indexOf(currentMessage);

        if (currentMessageIndex !== -1) {
            const currentQuestionIndex = questionMessageIndices.reduce((prev, curr) => {
                return curr <= currentMessageIndex ? curr : prev;
            }, -1);

            const questionIndex = questionMessageIndices.indexOf(currentQuestionIndex);
            setCurrentQuestion(questionIndex !== -1 ? questionIndex : 0);
        }
    }, [currentMessage, questionMessageIndices]);

    useEffect(() => {

        const grading = interviewScores.find(s => s.question == questions[currentQuestion])
        if (grading) {
            setCurrentGrading(grading)
        }

    }, [currentQuestion, interviewScores]);


    const handleGrading = async () => {
        await getFeedback(id, questions, messages, path)
        router.refresh()
    }

    useEffect(() => {
        if (interviewScores.length == 0) handleGrading()
    }, [interviewScores]);

    const overallScore = Math.round(interviewScores.reduce((acc, curr) => acc + curr.score, 0) / interviewScores.length);


    return (
        <div className="flex w-full h-full justify-between gap-4 p-4">
            <div className="flex flex-col w-full h-full">
                <Link className="text-left font-bold text-lg text-slate-800 mb-4" href={`/mockinterviews/${id}`}>{name}</Link>
                <div className="flex h-full gap-4">
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-32">
                            <GradingVisual overallScore={overallScore} />
                        </div>
                        <div className="flex flex-col border w-96 rounded-xl overflow-y-scroll h-full">
                            <h3 className="text-xl font-semibold bg-white w-full py-3 text-center">Questions</h3>
                            <div className="flex flex-col p-1 md:p-2 lg:p-3">
                                {questions.map((q, i) => {
                                    const handleQuestionClick = () => {
                                        const foundMessage = messages.find(m => m.content.includes(q));
                                        if (foundMessage) {
                                            setCurrentMessage(foundMessage);
                                        }
                                        const foundVideo = recordings.find(r => (r.createdTimeStamp && foundMessage?.createdAt) && new Date(r.createdTimeStamp) > foundMessage?.createdAt);
                                        if (foundVideo) {
                                            setCurrentVideo(foundVideo);
                                        }
                                    };
                                    return (
                                        <button onClick={handleQuestionClick} key={i} className={cn("py-4 border-b text-sm", currentQuestion == i && 'bg-slate-100')}>{q}</button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col justify-start items-center">
                        <AnimatePresence mode='wait'>
                            {currentVideo && (
                                <motion.div
                                    key={currentVideo.link}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full flex flex-col justify-start items-center"
                                >
                                    <VideoPlayer currentVideo={currentVideo.link || ''} goToNext={goToNext} />
                                    {currentGrading && <InterviewGrades score={currentGrading} />}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <div className="w-96">
                <Chat messages={messages} showTranscript={true} messageId={currentMessage?.id} handleMessageClick={handleMessageClick} />
            </div>
        </div>
    );
};
