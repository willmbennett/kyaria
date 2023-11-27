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
    const section = watch(sectionName);

    const { messages, setMessages, reload, append, stop } = useChat({
        body: {
            temp: 0.3
        },
        initialMessages: [
            {
                id: "1", role: "system", content: `You are a professional resume writer experienced in enhancing resume ${sectionName}.`
            },
            {
                id: "2", role: "user", content: `Please refine this ${section} for clarity and impact: ${section}. The response should just be the refined text.`
            },
            { id: '1', role: 'assistant', content: section }
        ],
        onFinish() {
            setFinishedLoading(true);
            setLoading(false);
        }
    });

    const lastmessage = messages[messages.length - 1]

    async function optimizeClick() {
        if (!section) return;

        setFinishedLoading(false)
        setLoading(true)
        append({
            role: "user",
            content: `Please help me refine this: ${section}`
        })
    }

    // Save the final message to context
    useEffect(() => {
        if (finishedLoading) {
            setValue(sectionName, lastmessage.content)
        }
    }, [finishedLoading]);
    
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {sectionName.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
            </label>
            <TextareaAutosize
                {...register(sectionName)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={(loading && lastmessage.role == 'assistant' && lastmessage.content) || section}
            />
            {optimize && <Button size='md' type="button" onClick={optimizeClick} className="ml-2" disabled={loading}>Optimize</Button>}
        </div>
    );
};

export default SingleInput;
