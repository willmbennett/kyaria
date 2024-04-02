import { Message, useChat } from "ai/react";
import { useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { JobClass } from "../../models/Job";
import { ResumeClass } from "../../models/Resume";

interface UseOptimiseProps {
    sectionName: string;
    optimize?: boolean;
    job?: Partial<JobClass>
    resume: ResumeClass
}

export const useOptimise = ({ sectionName, optimize, job, resume }: UseOptimiseProps) => {
    const [loading, setLoading] = useState(false)
    const [finishedLoading, setFinishedLoading] = useState(false)
    const { watch, setValue } = useFormContext();
    const currentState = watch(sectionName);

    const [history, setHistory] = useState([currentState]);
    const [position, setPosition] = useState(0);
    const canUndo = position > 0;
    const canRedo = position < history.length - 1;

    const undo = () => {
        if (canUndo) {
            setPosition(position - 1);
            setValue(sectionName, history[position - 1])
        }
    };

    const redo = () => {
        if (canRedo) {
            setPosition(position + 1);
            setValue(sectionName, history[position + 1])
        }
    };

    const addToHistory = useCallback(() => {
        //console.log('About to update history with history: ', history, ' and currentState: ', currentState)
        const newHistory = [...history, currentState]
        //console.log('newHistory: ', newHistory)
        setHistory(newHistory)
        setPosition(position + 1);
    }, [history, currentState, position])


    const initialMessages: Message[] = [
        {
            id: "1", role: "system", content: `You are an advanced career coach specialized in writing resume professional resume summaries. Here is the user's resume ${JSON.stringify(resume)}. Use this resume as context when writing summaries. Use the following format as an outline for the response: Professional Title (if relevant) + Key Experiences (with the total number of years worked) + Top Achievements (preferably measurable results) + Top Skills/Expertise/Unique Values (relevant to the job and industry). Keep the length around 100 words`
        },
        {
            id: "2", role: "user", content: `${currentState ?
                `Please refine this summary for clarity and impact: ${currentState}${job ? `and tailor it for this job post ${JSON.stringify(job)}` : ''}. Your response should just be the refined text.`
                :
                `Help me write a summary ${job ? `and tailor it for this job post ${JSON.stringify(job)}` : ''}. Your response should just be the summary text.  Keep the length around 100 words`
                }`
        }
    ]

    const { messages, setMessages, reload, append, stop } = useChat({
        body: {
            temp: 0.3
        },
        initialMessages: [...initialMessages,
        { id: '3', role: 'assistant', content: currentState }],
        onFinish() {
            setLoading(false);
            setFinishedLoading(true)
        }
    });

    const lastmessage = messages[messages.length - 1]

    async function optimizeClick() {
        if (optimize) {
            if (history[position] != currentState) {
                addToHistory()
            }
            setLoading(true)
            setFinishedLoading(false)
            reload()
        }
    }

    async function handleStop() {
        if (optimize) {
            addToHistory()
            setLoading(false)
            setFinishedLoading(false)
            stop()
        }
    }

    const handleModifyResponse = (action: 'shorten' | 'lengthen') => {
        if (optimize) {
            setLoading(true);

            const prompt = action === 'shorten' ?
                `Please shorten this summary: ${currentState}` :
                `Please lengthen this summary: ${currentState}`;

            const newMessages: Message[] = [...initialMessages, {
                id: '3', // You may want to generate a unique ID for each new message
                role: 'user',
                content: prompt
            },
            { id: '3', role: 'assistant', content: currentState }]

            setMessages(newMessages);

            reload();
        }
    };

    // Save the final message to context
    useEffect(() => {
        if (finishedLoading && optimize) {
            //console.log('About to add to history')
            addToHistory()
        }
    }, [finishedLoading, optimize]);

    useEffect(() => {
        if (optimize) {
            //console.log('Made it to setting value function with loading: ', loading, ' and lastmessage: ', lastmessage)
            if (loading && lastmessage?.role === 'assistant') {
                //console.log('About to set value')
                setValue(sectionName, lastmessage.content);
            }
        }
    }, [optimize, loading, lastmessage, sectionName]);

    return { canUndo, undo, canRedo, redo, loading, currentState, handleModifyResponse, handleStop, optimizeClick, history }
}