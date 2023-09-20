import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useChat } from 'ai/react';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

type FormFields = {
    input: string;
};

export default function TextToJSON(
    {
        setValues,
        expectedJson,
        defaultTextInput,
        demoJSON,
        inputTextType,
        setFormView,
        setInputTextView,
    }: {
        setValues: any,
        expectedJson: any,
        defaultTextInput?: string,
        demoJSON?: any,
        inputTextType: string,
        setFormView?: any,
        setInputTextView?: any
    }) {
    const [loading, setLoading] = useState(false)
    const [finishedLoading, setFinishedLoading] = useState(false)
    const { register, handleSubmit, control } = useForm<FormFields>({
        defaultValues: { input: defaultTextInput ? defaultTextInput : '' } // Leave blank
    });

    const { messages, reload, append } = useChat({
        body: {
            temp: 0.1
        },
        onFinish() {
            setFinishedLoading(true)
        }
    });

    // Make a call to chatGPT
    const chatGPT = async (message: any) => {
        setLoading(true)
        append(message);
        //setFinishedLoading(true)
    };

    // Save the final message to context
    useEffect(() => {
        if (finishedLoading) {
            const finalMessage = demoJSON ? demoJSON : JSON.parse(messages[messages.length - 1].content);
            console.log(finalMessage)
            setValues(finalMessage)
            setInputTextView(false) // hide the text input
            setFormView(true) // Show the form
            setLoading(false)
            
        }
    }, [finishedLoading]);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const message = [
            {
                "role": "system",
                "content": `You will be provided with unstructured data, and your task is to extract data from it. Return the data in the following format: ${JSON.stringify(expectedJson)}. If fields are empy simply return them as such.`
            },
            {
                "role": "user",
                "content": `Extract the ${inputTextType} details from this ${data.input} text and return it in json format following this format: ${JSON.stringify(expectedJson)}`
            }
        ]
        console.log(message)
        chatGPT(message)
    };

    return (
        <>
            <div className='flex-col items-center'>
                {!loading && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={BASIC_FIELD_STYLE}>
                            <p>Paste your text here</p>
                            <textarea {...register('input')} placeholder="Text Input" rows={15} cols={50}></textarea>
                        </div>

                        <div className={BASIC_FIELD_STYLE}>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                                disabled={loading}
                                type="submit">Submit</button>
                        </div>
                        {loading && (
                            <div>
                                <p>Insert Pretty Loading GIF Here</p>
                            </div>
                        )}
                    </form>
                )}
                {loading && (<div className='flex-col items-center'>
                    <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                        AI is scanning your data
                    </h1>
                    <div className='p-2'>
                    <p>This may take a minute</p>
                    </div>
                    <iframe src="https://giphy.com/embed/gJ3mEToTDJn3LT6kCT" className="giphy-embed w-full"></iframe>
                </div>)}
            </div>
        </>
    );
}
