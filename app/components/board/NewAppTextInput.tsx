import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useChat } from 'ai/react';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

type FormFields = {
    input: string;
};

export default function NewAppTextInput(
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
        //console.log("1")
        setLoading(true)
        if (['development', 'preview'].includes(process.env.NEXT_PUBLIC_VERCEL_ENV || '')){
            //console.log("2")
            setFinishedLoading(true)
        } else {
            //console.log("3")
            append(message);
        }
    };

    // Save the final message to context
    useEffect(() => {
        if (finishedLoading) {
            const finalMessage = ['development', 'preview'].includes(process.env.NEXT_PUBLIC_VERCEL_ENV || '')? demoJSON : JSON.parse(messages[messages.length - 1].content);
            //console.log(finalMessage)
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
                            <textarea {...register('input')} placeholder="Text Input" rows={15} cols={50} className="rounded-sm"></textarea>
                        </div>

                        <div className={BASIC_FIELD_STYLE}>
                            <button
                                className="inline-block rounded px-6 pb-2 pt-2.5 text-xs hover:opacity-80 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
                                style={{ backgroundColor: '#00703C' }}
                                data-te-ripple-init
                                data-te-ripple-color="light"
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