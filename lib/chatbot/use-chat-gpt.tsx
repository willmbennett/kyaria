'use client'
import { Message } from "ai";
import { ResumeClass } from "../../models/Resume";
import { useCallback, useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useRouter } from "next/navigation";
import { EVE_GENERIC_INTRO, getFillerVideo } from "../../app/eve/eve-helper";

interface useChatGPTProps {
    userId: string;
    fillerVideo: HTMLVideoElement | null;
    selectedResume?: ResumeClass;
    submitScript: (message?: string) => Promise<void>
    connected: boolean;
    isStreaming: boolean;
    messages: Message[];
}

const logging = false

export const useChatGPT = ({ userId, fillerVideo, submitScript, connected, isStreaming, messages }: useChatGPTProps) => {
    const [recievedResult, setRecievedResult] = useState(false)
    const sentInitialMessage = messages.length > 2
    const [initialConnection, setInitialConnection] = useState(true)
    const [playIntroVideo, setPlayIntroVideo] = useState(true)
    const [playFiller, setPlayFiller] = useState(false)
    const router = useRouter()

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        //console.log('Made it here with browserSupportsSpeechRecognition', browserSupportsSpeechRecognition);
        if (!browserSupportsSpeechRecognition) {
            throw new Error("Your browser doesn't support speech recognition.");
        }
    }, [browserSupportsSpeechRecognition]);

    // Manage starting and stopping of listening
    useEffect(() => {
        SpeechRecognition.startListening({ continuous: true });

        // Cleanup function to stop listening only when the component unmounts
        return () => {
            //console.log('Cleaning up: stopping speech recognition...');
            SpeechRecognition.stopListening();
        };
    }, []); // Empty dependency array ensures this effect only runs on mount and unmount



    // Simplify the listening and submission

    const submitMessages = async (message?: string) => {
        await submitScript(message);
    }

    // Submit the initial message
    useEffect(() => {
        if ((!sentInitialMessage || !userId) && initialConnection) {
            if (userId) {
                if (connected) {
                    if (logging) console.log('Submitting the initial message.');
                    submitMessages();
                }
            } else {
                if (fillerVideo && playIntroVideo) {
                    if (logging) console.log('Playing the intro video.');
                    fillerVideo.src = EVE_GENERIC_INTRO
                    setPlayFiller(true)
                    setPlayIntroVideo(false)
                }
            }
        }
    }, [userId, fillerVideo, connected, sentInitialMessage, initialConnection, playIntroVideo]);

    const handleSubmission = useCallback(() => {
        //console.log('Made it to submit')
        if (transcript) {
            if (fillerVideo) {
                fillerVideo.src = getFillerVideo()
                setRecievedResult(false)
                setPlayFiller(true)
            }
            submitMessages(transcript)
            resetTranscript()
            if (initialConnection) {
                setInitialConnection(false)
            }
        }
    }, [initialConnection, transcript, fillerVideo])

    // Submit the initial message
    useEffect(() => {
        if (isStreaming) {
            if (logging) console.log('Stream has started.');
            setRecievedResult(true)
            router.refresh()
        }
    }, [isStreaming]);

    useEffect(() => {
        if (fillerVideo) {
            const handleFillerEnd = () => {
                setPlayFiller(false);  // Hide filler video
            };
            fillerVideo.addEventListener('ended', handleFillerEnd);

            return () => {
                if (fillerVideo) {
                    fillerVideo.removeEventListener('ended', handleFillerEnd);
                }
            };
        }
    }, [fillerVideo]);

    const canSubmit = transcript != '' && !isStreaming && !playFiller && (recievedResult || initialConnection) && sentInitialMessage

    return { transcript, listening, handleSubmission, canSubmit, playFiller }
}