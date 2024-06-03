'use client'
import Link from 'next/link';
import { Chat } from '../chatbot/Chat';
import { Message } from 'ai';
import { VideoPlayer } from './VideoPlayer';
import { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';

interface MockInterviewsProps {
    id: string;
    name: string;
    questions: string[];
    messages: Message[];
    recordings: { link: string | undefined; createdTimeStamp: string | undefined; }[];
}

export const MockInterviews = ({ id, name, questions, messages, recordings }: MockInterviewsProps) => {
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


    return (
        <>
            <div className="flex w-full h-full justify-between gap-4">
                <div className="flex flex-col w-full h-full">
                    <Link className="text-left font-bold text-lg text-slate-800" href={`/mockinterviews/${id}`}>{name}</Link>
                    <div className="flex items-center h-full gap-4">
                        <div className="flex flex-col w-96 border rounded-xl overflow-y-scroll">
                            <h3 className="text-xl font-semibold bg-white w-full py-3 text-center">Questions</h3>
                            <div className="flex flex-col p-1 md:p-2 lg:p-3">
                                {questions.map((q, i) => {
                                    const handleQuestionClick = () => {
                                        const foundMessage = messages.find(m => m.content.includes(q))
                                        if (foundMessage) {
                                            setCurrentMessage(foundMessage)
                                        }
                                        const foundVideo = recordings.find(r => (r.createdTimeStamp && foundMessage?.createdAt) && new Date(r.createdTimeStamp) > foundMessage?.createdAt)

                                        if (foundVideo) {
                                            setCurrentVideo(foundVideo)
                                        }
                                    }
                                    return (
                                        <button onClick={handleQuestionClick} key={i} className={cn("py-4 border-b text-sm", currentQuestion == i && 'bg-slate-100')}>{q}</button>
                                    )
                                })}
                            </div>
                        </div>
                        {currentVideo &&
                            <div className='w-full flex justify-center'>
                                <VideoPlayer currentVideo={currentVideo.link || ''} goToNext={goToNext} />
                            </div>
                        }
                    </div>
                </div>
                <Chat messages={messages} showTranscript={true} messageId={currentMessage?.id} handleMessageClick={handleMessageClick} />
            </div>
        </>
    );
};
