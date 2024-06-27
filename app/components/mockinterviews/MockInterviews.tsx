'use client'
import { Chat } from '../chatbot/Chat';
import { Message } from 'ai';
import { VideoPlayer } from './VideoPlayer';
import { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';
import { InterviewGrades } from './InterviewGrading';
import { getFeedback } from '../../mockinterviews/recordings/[id]/_action';
import { usePathname, useRouter } from 'next/navigation';
import GradingVisual from './GradingVisual';
import { AnimatePresence, motion } from 'framer-motion';
import { HoverCardComponent } from './HoverCardComponent';

interface MockInterviewsProps {
    id: string;
    name: string;
    questions: string[];
    mockInterviewDate: string;
    messages: Message[];
    recordings: { link: string | undefined; createdTimeStamp: string | undefined; }[];
    interviewScores: {
        question: string;
        explanation: string; // Added explanation field
        score: number
    }[]
    feedback?: string;
}

export const MockInterviews = ({ id, name, questions, messages, recordings, interviewScores, feedback, mockInterviewDate }: MockInterviewsProps) => {
    const path = usePathname()
    const router = useRouter()
    const numRecordings = recordings.length
    const numMessages = messages.length
    const defaultVideo = numRecordings > 0 ? recordings[0] : null;
    const defaultMessage = numMessages > 0 ? messages.filter(m => m.role == 'assistant')[0] : null;
    const [currentVideo, setCurrentVideo] = useState(defaultVideo)
    const [currentMessage, setCurrentMessage] = useState(defaultMessage)

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


    const handleGrading = async () => {
        await getFeedback(id, questions, messages, path)
        router.refresh()
    }

    useEffect(() => {
        if (interviewScores.length == 0) handleGrading()
    }, [interviewScores]);

    const overallScore = Math.round(interviewScores.reduce((acc, curr) => acc + curr.score, 0) / interviewScores.length * 10) / 10;

    return (
        <div className="flex w-full h-full justify-between gap-4 p-4 dark:bg-vanilla">
            <div className="flex flex-col h-full w-full gap-4">
                <div className='flex w-full gap-2 md:gap-4 h-2/3'>
                    <div className="w-96 h-full flex flex-col rounded-xl border p-1 md:p-2 lg:p-3 items-center justify-center gap-4">
                        <div className='w-32'>
                            <GradingVisual overallScore={overallScore} />
                        </div>
                        <div className='flex w-full justify-center gap-2 items-center'>
                            <p className='text-slate-800 text-md'>Share your results! </p>
                            <HoverCardComponent
                                interviewName={name}
                                overallScore={overallScore}
                                feedback={feedback ? feedback : ''}
                                mockInterviewDate={mockInterviewDate}
                            />
                        </div>
                        {feedback && <p className='text-slate-800 text-sm'>{feedback}</p>}
                    </div>
                    <div className="w-full h-full flex justify-center items-center overflow-hidden">
                        <AnimatePresence mode='wait'>
                            {currentVideo && (
                                <motion.div
                                    key={currentVideo.link}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full flex flex-col justify-center items-center"
                                >
                                    <VideoPlayer currentVideo={currentVideo.link || ''} goToNext={goToNext} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex flex-col border rounded-xl overflow-y-scroll w-full h-1/3 bg-white dark:bg-vanilla p-2">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Score</th>
                                <th>Explanation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviewScores.map((q, i) => {
                                const { question, explanation, score } = q
                                const handleQuestionClick = () => {
                                    const foundMessage = messages.find(m => m.content.includes(question));
                                    if (foundMessage) {
                                        setCurrentMessage(foundMessage);
                                    }
                                    const foundVideo = recordings.find(r => (r.createdTimeStamp && foundMessage?.createdAt) && new Date(r.createdTimeStamp) > foundMessage?.createdAt);
                                    if (foundVideo) {
                                        setCurrentVideo(foundVideo);
                                    }
                                };
                                return (
                                    <tr key={i} onClick={handleQuestionClick} className={cn("text-sm border-b border-slate-200", currentQuestion == i && 'bg-purple-dark')}>
                                        <td className={cn("py-2 px-3 text-start bg-purple-light", currentQuestion == i && 'bg-purple-dark')}>
                                            <p>{question}</p>
                                        </td>
                                        <td className='py-2 px-5 font-bold border-x'>
                                            <p>{score}</p>
                                        </td>
                                        <td className='py-2 px-3'>
                                            <p>{explanation}</p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Chat messages={messages} messageId={currentMessage?.id} handleMessageClick={handleMessageClick} />
        </div>
    );
};
