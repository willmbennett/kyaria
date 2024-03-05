'use client'
import { Message } from "ai";
import { ResumeClass } from "../../models/Resume";
import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface useChatGPTProps {
    selectedResume?: ResumeClass;
    submitScript: (text: string) => Promise<void>
    connected: boolean;
    isStreaming: boolean;
}

export const useChatGPT = ({ selectedResume, submitScript, connected, isStreaming }: useChatGPTProps) => {
    const [submitMessage, setSubmitMessage] = useState(false);
    const [messageToSubmit, setMessageToSubmit] = useState<Message | null>(null);
    const submissionTimeoutRef = useRef<NodeJS.Timeout>(); // Handle figuring out when the user finishes speaking
    const [sentInitialMessage, setSentInitialMessage] = useState(false)

    // Utility function to add createdAt field to a message object
    const addCreatedAt = (message: Message) => ({
        ...message,
        createdAt: new Date()
    });

    // Initial message with added createdAt
    const initialMessageWithCreatedAt: Message = addCreatedAt({
        id: '1',
        role: "system",
        content: `Your name is Eve, and you're here as a Career Coach, ready to offer guidance on job searches, resumes, interviews, and more. When users request activities like mock interviews, enthusiastically initiate with a relevant question and provide follow-up questions and feedback for each user response. Upon receiving a request for a resume review, first ask the user if there's a specific section they wish to focus on. Tailor your advice based on their response: if a specific section is mentioned, concentrate on providing targeted advice for that section to enhance clarity, impact, and alignment with job goals. If no specific section is mentioned, proceed to methodically evaluate each section in plain text, offering comprehensive advice. Include advice on navigating career setbacks, negotiating offers, and maintaining motivation during the job search to provide comprehensive support. Admit gracefully if unsure or if a request is beyond capabilities, reminding users of potential inaccuracies. Ensure responses use SSML for spoken delivery but do not specify voice characteristics, also explicitly avoid using Markdown or other formatting syntax like hashtags or asterisks. Always prioritize clarity and accessibility in written responses. ${selectedResume ? 'Here\'s the user\'s resume: ' + JSON.stringify(selectedResume) : ''}`
    }
    );

    //console.log('initialMessageWithCreatedAt', initialMessageWithCreatedAt)

    const { messages, append, isLoading } = useChat({
        body: {
            temp: 0.3,
            max_tokens: 300
        },
        initialMessages: [initialMessageWithCreatedAt],
        onFinish() {
            //console.log('Made it to finish')
            setSubmitMessage(true);
        }
    });


    // Utility function to handle appending messages to the chat
    const handleAppendMessage = (messageContent: string) => {
        const message: Message = {
            id: String(new Date().getTime()), // Generating a simple unique ID
            role: 'user',
            content: messageContent,
            createdAt: new Date(),
        };
        append(message);
    };

    useEffect(() => {
        const lastMessage = messages[messages.length - 1]

        if (submitMessage && !messageToSubmit && lastMessage.role == 'assistant' && !isLoading) {
            //console.log('About to create a new message to send: [submitMessage]', lastMessage.content);
            setMessageToSubmit(lastMessage)
        }
    }, [submitMessage, messageToSubmit, messages, isLoading]);

    // Use a separate effect to handle the actual submission of messagesToSend
    useEffect(() => {

        if (messageToSubmit && !isStreaming) {
            //console.log('Found a new assistant message for submission:', messageToSubmit.content);

            const submitMessages = async () => {
                const messagesToSend = {
                    id: messageToSubmit.id,
                    role: messageToSubmit.role,
                    content: messageToSubmit.content,
                    created_at: messageToSubmit.createdAt
                }
                //console.log('Submitting message [messagesToSend]:', messagesToSend);

                // For now until the api is available submit just the content
                await submitScript(messagesToSend.content);
                //console.log(`Updated last submitted message ID to: ${messagesToSend.id}`);
                setSubmitMessage(false)
                setMessageToSubmit(null)
            }

            submitMessages()
        }
    }, [messageToSubmit, isStreaming]);

    const greetings = ["Hi", "Hey", "Hello"];
    const supportVerbs = ["support", "guide", "assist"];
    const motivationVerbs = ["motivate", "inspire", "encourage"];
    const focusActions = ["exploring", "improving", "achieving", "focusing on"];

    // Assuming you have the user's name available
    const userName = selectedResume?.name

    // Randomly select elements from each array
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    const supportVerb = supportVerbs[Math.floor(Math.random() * supportVerbs.length)];
    const motivationVerb = motivationVerbs[Math.floor(Math.random() * motivationVerbs.length)];
    const focusAction = focusActions[Math.floor(Math.random() * focusActions.length)];

    // Construct the message
    const personalizedGreeting = `${greeting} ${userName ? userName : 'there'}, welcome to your career coaching session. If you have any questions or need advice, don't hesitate to ask. I'm here to ${supportVerb} and ${motivationVerb} you! What are we ${focusAction} today?`;

    useEffect(() => {
        //console.log('Made it to initial submission')
        if (connected && messages.length === 1 && !sentInitialMessage && !isStreaming) {
            //console.log('connected state: ', connected)
            //console.log('messages.length: ', messages.length)
            //console.log('messages: ', messages)
            const initialMessage = `I'd like to do a career coaching session session. Please welcome me using this message: ${personalizedGreeting}`;
            handleAppendMessage(initialMessage)
            setSentInitialMessage(true)
        }
    }, [connected, messages, sentInitialMessage, isStreaming]);




    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    useEffect(() => {
        //console.log(`Effect running: listening = ${listening}, isStreaming = ${isStreaming}`);

        if (!listening && !isStreaming && !isLoading) {
            //console.log('Starting speech recognition...');
            SpeechRecognition.startListening({ continuous: true });
        } else if (isStreaming || isLoading) {
            //console.log('Aborting speech recognition...');
            SpeechRecognition.abortListening();
        }

        return () => {
            if (listening) {
                //console.log('Cleaning up: aborting speech recognition...');
                SpeechRecognition.abortListening();
            }
        };
    }, [listening, isStreaming]); // Dependency array


    useEffect(() => {
        // If we're listening, reset the submission timeout whenever transcript changes
        clearTimeout(submissionTimeoutRef.current);
        submissionTimeoutRef.current = setTimeout(() => {
            if (transcript) {
                //console.log('Made it to submit')
                handleAppendMessage(transcript)
                resetTranscript()
            }
        }, 2000); // Adjust delay as needed

        // Cleanup timeout on component unmount
        return () => clearTimeout(submissionTimeoutRef.current);
    }, [transcript]);

    return {}
}