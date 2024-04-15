'use client'
import { Message } from "ai";
import { ResumeClass } from "../../models/Resume";
import { useCallback, useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useRouter } from "next/navigation";
import { getFillerVideo } from "../../app/eve/eve-helper";

interface useChatGPTProps {
    selectedResume?: ResumeClass;
    submitScript: (message?: string) => Promise<void>
    connected: boolean;
    isStreaming: boolean;
    messages: Message[];
}

const logging = false

export const useChatGPT = ({ submitScript, connected, isStreaming, messages }: useChatGPTProps) => {
    const [recievedResult, setRecievedResult] = useState(false)
    const sentInitialMessage = messages.length > 2
    const [initialConnection, setInitialConnection] = useState(true)
    const [playFiller, setPlayFiller] = useState(false)
    const [fillerVideo, setFillerVideo] = useState(getFillerVideo())
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
        if (connected && !sentInitialMessage && initialConnection) {
            if (logging) console.log('Submitting the initial message.');
            submitMessages();
            setInitialConnection(false)
        }
    }, [connected, sentInitialMessage, initialConnection]);

    const handleSubmission = useCallback(() => {
        //console.log('Made it to submit')
        setFillerVideo(getFillerVideo())
        setRecievedResult(false)
        setPlayFiller(true)
        submitMessages(transcript)
        resetTranscript()
        if (initialConnection) {
            setInitialConnection(false)
        }
    }, [initialConnection])

    // Submit the initial message
    useEffect(() => {
        if (isStreaming) {
            if (logging) console.log('Stream has started.');
            setPlayFiller(false)
            setRecievedResult(true)
            router.refresh()
        }
    }, [isStreaming]);

    const canSubmit = transcript != '' && !isStreaming && (recievedResult || initialConnection) && sentInitialMessage

    return { transcript, listening, handleSubmission, canSubmit, playFiller, fillerVideo }
}