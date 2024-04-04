'use client'
import { Message } from "ai";
import { ResumeClass } from "../../models/Resume";
import { useCallback, useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface useChatGPTProps {
    selectedResume?: ResumeClass;
    submitScript: (message: string | null) => Promise<void>
    connected: boolean;
    isStreaming: boolean;
    useChatBot: boolean;
    startChat: boolean;
    messages: Message[];
}

const logging = false

export const useChatGPT = ({ submitScript, connected, isStreaming, useChatBot, startChat, messages }: useChatGPTProps) => {
    const [message, setMessage] = useState<string | null>(null)
    const [longResponse, setLongResponse] = useState(false)
    const [recievedResult, setRecievedResult] = useState(false)
    const [initialConnection, setInitialConnection] = useState(true)
    const submissionTimeoutRef = useRef<NodeJS.Timeout>(); // Handle figuring out when the user finishes speaking
    const sentInitialMessage = messages.length > 2

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    // First, clarify the conditions by assigning them to descriptively named variables.
    const isConnectedAndReady = connected && (recievedResult || initialConnection) && !isStreaming;
    const isChatbotOffButStartingChat = !useChatBot && startChat;
    const isReadyToListen = sentInitialMessage;

    // Then, combine these conditions to determine if the system should listen.
    const shouldListen = isReadyToListen && (isConnectedAndReady || isChatbotOffButStartingChat);


    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            throw new Error("Your browser doesn't support speech recognition")
        }
    }, [browserSupportsSpeechRecognition]);

    const submitMessages = useCallback(async () => {
        await submitScript(message);
        setMessage(null);
    }, [message, submitScript])

    useEffect(() => {
        if (logging) console.log(`useEffect triggered. Conditions: { connected: ${connected}, useChatBot: ${useChatBot}, sentInitialMessage: ${sentInitialMessage}, message: ${message} }`);

        if ((connected || (!useChatBot && startChat)) && !sentInitialMessage || message) {
            if (logging) console.log('Submitting messages because either the initial message has not been sent or there is a new message.');
            submitMessages();
        }
    }, [message, useChatBot, startChat, connected, sentInitialMessage]);


    useEffect(() => {
        if (logging) {
            console.log(`Effect running: listening = ${listening}`);
            console.log(`Effect running: shouldListen = ${shouldListen}`);
            console.log(`isConnectedAndReady (${isConnectedAndReady}): { connected: ${connected}, recievedResult: ${recievedResult}, initialConnection: ${initialConnection}, isStreaming: ${isStreaming} }`); //
            console.log(`isChatbotOffButStartingChat (${isChatbotOffButStartingChat}): { useChatBot: ${useChatBot}, startChat: ${startChat}}`); // Logging the condition
            console.log(`isReadyToListen: ${isReadyToListen}`); // Logging the condition
        }

        if (shouldListen && !listening) {
            if (logging) console.log('Starting speech recognition...');
            SpeechRecognition.startListening({ continuous: true });
        } else if (!shouldListen && listening) {
            if (logging) console.log('Aborting speech recognition...');
            SpeechRecognition.abortListening();
        }

        return () => {
            if (listening) {
                if (logging) console.log('Cleaning up: aborting speech recognition...');
                SpeechRecognition.abortListening();
            }
        };

    }, [shouldListen, listening]); // Dependency array

    useEffect(() => {
        if (isStreaming && !recievedResult) {
            setRecievedResult(true)
        }
    }, [isStreaming]);

    useEffect(() => {
        // If we're listening, reset the submission timeout whenever transcript changes
        if (transcript && !longResponse) {
            const handleSubmission = () => {
                //console.log('Made it to submit')
                setMessage(transcript)
                resetTranscript()
                setRecievedResult(false)
                setInitialConnection(false)
            }
            clearTimeout(submissionTimeoutRef.current);
            submissionTimeoutRef.current = setTimeout(() => {
                handleSubmission()
            }, 2000); // Adjust delay as needed
        }

        if (longResponse) {
            clearTimeout(submissionTimeoutRef.current);
        }


        // Cleanup timeout on component unmount
        return () => clearTimeout(submissionTimeoutRef.current);
    }, [transcript, longResponse]);

    const toggleLongResponse = () => {
        setLongResponse(!longResponse)
    }

    return { transcript, listening, longResponse, toggleLongResponse }
}