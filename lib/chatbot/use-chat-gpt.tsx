'use client'
import { ResumeClass } from "../../models/Resume";
import { useCallback, useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime'

interface useChatGPTProps {
    selectedResume?: ResumeClass;
    submitScript: (message: string | null) => Promise<void>
    connected: boolean;
    isStreaming: boolean;
    useChatBot: boolean
}

export const useChatGPT = ({ submitScript, connected, isStreaming, useChatBot }: useChatGPTProps) => {
    const [message, setMessage] = useState<string | null>(null)
    const submissionTimeoutRef = useRef<NodeJS.Timeout>(); // Handle figuring out when the user finishes speaking
    const [sentInitialMessage, setSentinitalMessage] = useState(false)
    //console.log('initialMessageWithCreatedAt', initialMessageWithCreatedAt)

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const submitMessages = useCallback(async () => {
        await submitScript(message);
    }, [message, submitScript])

    useEffect(() => {
        if (connected) {
            if (useChatBot) {
                if (!sentInitialMessage || message) {
                    submitMessages()
                    setSentinitalMessage(true)
                }
                else if (message) {
                    submitMessages()
                    setMessage(null)
                }
            } else {
                //console.log('message: ', message)
            }
        }
    }, [message, useChatBot, connected, sentInitialMessage])

    useEffect(() => {
        //console.log(`Effect running: listening = ${listening}, isStreaming = ${isStreaming}`);

        if (!listening && !isStreaming && connected && sentInitialMessage) {
            //console.log('Starting speech recognition...');
            SpeechRecognition.startListening({ continuous: true });
        } else if (isStreaming) {
            //console.log('Aborting speech recognition...');
            SpeechRecognition.abortListening();
        }

        return () => {
            if (listening) {
                //console.log('Cleaning up: aborting speech recognition...');
                SpeechRecognition.abortListening();
            }
        };
    }, [listening, isStreaming, connected, sentInitialMessage]); // Dependency array


    useEffect(() => {
        // If we're listening, reset the submission timeout whenever transcript changes
        clearTimeout(submissionTimeoutRef.current);
        submissionTimeoutRef.current = setTimeout(() => {
            if (transcript) {
                //console.log('Made it to submit')
                setMessage(transcript)
                resetTranscript()
            }
        }, 2000); // Adjust delay as needed

        // Cleanup timeout on component unmount
        return () => clearTimeout(submissionTimeoutRef.current);
    }, [transcript]);

    return { browserSupportsSpeechRecognition, transcript, listening }
}