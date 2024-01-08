import React, { useEffect, useState } from 'react';
import { Message, useChat } from 'ai/react';
import { useFormContext, UseFormRegister } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '../../Button';

type SingleInputProps = {
    sectionName: string
    register: UseFormRegister<any>;
    optimize?: boolean
};

const SingleInput: React.FC<SingleInputProps> = ({ sectionName, register, optimize }) => {
    const [finishedLoading, setFinishedLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const { watch, setValue } = useFormContext();
    const section: string = watch(sectionName);
    const [response, setResponse] = useState(section);
    const userResume = watch();

    const { messages, setMessages, reload, append, stop } = useChat({
        body: {
            temp: 0.3
        },
        initialMessages: [
            {
                id: "1", role: "system", content: `You are an advanced career coach specialized in writing resume professional resume summaries. Here is the user's resume ${JSON.stringify(userResume)}. Use this resume as context when writing summaries. Use the following format as an outline for the response: Professional Title (if relevant) + Key Experiences (with the total number of years worked) + Top Achievements (preferably measurable results) + Top Skills/Expertise/Unique Values (relevant to the job and industry). Keep the length around 100 words`
            },
            {
                id: "2", role: "user", content: `${section ?
                    `Please refine this summary for clarity and impact: ${section}. Your response should just be the refined text.`
                    :
                    `Help me write a summary. Your response should just be the summary text.`
                    }`
            },
            { id: '1', role: 'assistant', content: section }
        ],
        onFinish() {
            setFinishedLoading(true)
            setLoading(false);
        }
    });

    const lastmessage = messages[messages.length - 1]

    // Save the final message to context
    useEffect(() => {
        if (lastmessage && lastmessage.role == 'assistant') {
            setResponse(lastmessage.content);
        }
    }, [lastmessage]);

    async function optimizeClick() {
        setFinishedLoading(false)
        setLoading(true)
        reload()
    }

    async function handleStop() {
        setFinishedLoading(true)
        setLoading(false)
        stop()
    }

    // Save the final message to context
    useEffect(() => {
        if (finishedLoading) {
            setValue(sectionName, lastmessage.content)
        }
    }, [finishedLoading]);

    // Update the state when user edits the textarea
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(sectionName, event.target.value)
        setResponse(event.target.value);
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {sectionName.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
            </label>
            {optimize ?
                <TextareaAutosize
                    {...register(sectionName)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={response}
                    onChange={handleTextareaChange}
                />
                :
                <TextareaAutosize
                    {...register(sectionName)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            }
            {optimize && !loading && <Button size='md' type="button" onClick={optimizeClick} className="ml-2" disabled={loading}>{section ? 'Optimize' : 'Generate Summary'}</Button>}
            {loading && <Button variant='secondary' size='md' type="button" onClick={handleStop} className="ml-2" >Stop</Button>}
        </div>
    );
};

export default SingleInput;
