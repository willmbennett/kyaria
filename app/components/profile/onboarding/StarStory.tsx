'use client'

import ChatWithGPT from '../../board/ChatWithGPT';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { updateProfileAction } from '../../../profile/_action';
import { Button } from '../../Button';

const ACTIVE_ROUTE = "bg-gray-200 hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "hover:bg-gray-600 hover:text-white";
const BASIC_FIELD_STYLE = 'text-left font-medium text-lg py-4 flex flex-col w-full'

type QuestionFormFields = {
    details: string
};

interface MessageItem {
    role: string;
    content: string;
}

export default function StarStory({
    profileId,
    setKey,
    currentState,
    accomplishment,
    detail
}: {
    profileId: string,
    setKey: string,
    currentState: string,
    accomplishment: string
    detail: string
}) {
    const [showOptions, setShowOptions] = useState(false);
    const themes = [
        'None',
        'Leadership',
        'Conflict Resolution',
        'Collaboration',
        'Problem Solving',
        'Time Management',
        'Adaptability',
        'Communication',
        'Customer Service',
        'Initiative',
        'Teamwork'
    ];

    const [selectedTheme, setSelectedTheme] = useState(themes[0]);
    const [showDetails, setShowDetails] = useState(detail == '' ? true : false);


    const optionsClick = () => {
        setShowOptions(!showOptions);
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<QuestionFormFields>({
        defaultValues: { details: detail }
    });

    const message = [
        {
            "role": "system",
            "content": `You are an advanced career coach specialized in crafting compelling STAR stories. 
            Tone: conversational, spartan, use less corporate jargon

            The user will give you a situation and some details and you will provide a concise STAR story (it should take less than 30 seconds to say)
            
            Here is an example"
            ### **Situation:** 
            I was overseeing the delivery/pickup forecasting system at Whole Foods, which was plagued with a high
            error rate leading to significant financial losses and missed customer demand.
            ### **Task:** 
            My responsibility was to reduce this error rate, minimize cost and prevent lost customer demand.
            ### **Action:** 
            I led a team to analyze and refine our forecasting model, implementing advanced machine learning
            algorithms to better predict customer behavior. We also incorporated real-time demand data to make
            our model more dynamic.
            ### **Result:** 
            Our efforts reduced the forecast error by 35%, leading to cost savings of 10 million per year and
            reducing lost customer demand worth 20 million per year. This experience equipped me with valuable
            insights into how data-driven product management can directly improve a company&'ss bottom line.
            `
        },
        {
            role: "user",
            content: `Create a STAR story ${selectedTheme == '' ? '' : `with the theme of ${selectedTheme}`} for this resume accomplishment: "${accomplishment}". 
            ${detail ? `Here are some details about the achievement: ${detail}` : ""}
            Refine the story. 
            `
        }
    ]

    const onSubmit: SubmitHandler<QuestionFormFields> = async (data: any) => {
        const { details } = data

        const savedData: { [key: string]: any } = {};
        savedData[`${setKey}.detail`] = details; // Set the detail property to the details provided.

        //console.log(profileId, savedData)
        const update = await updateProfileAction(profileId, savedData, "/")
        //console.log("Submitted data:", update);
        setShowDetails(false)
    };

    const defaultMessage = `To make the best story possible add details such as: 
- What the business impact of the project was.
- Who you worked with to deliver this project.
- What challenges you overcame.
- What tools/tech did you use.
- How you went above and beyond your role.
`

    return (
        <>
            <div className="rounded-xl p-4 bg-gray-50 shadow-sm">
                <h3 className="text-left mb-2 font-bold">Accomplishment</h3>
                <p className="text-left mb-4">{accomplishment}</p>
                {showDetails && (
                    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                        <div className="mb-3">
                            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-700">Add some details on your accomplishment to improve your story</label>
                            <textarea 
                            {...register("details", { required: true })} 
                            id="details" rows={10} 
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                            placeholder={defaultMessage}
                            />
                            {errors.details && <p className="mt-1 text-xs text-red-600">Please specify your experience.</p>}
                        </div>
                        <Button
                            type="submit"
                            size='md'
                        >
                            Add Details
                        </Button>
                    </form>
                )}
                {!showDetails && (
                    <>
                        <div className='flex justify-between items-center'>
                            <h3 className="text-left mb-2 font-bold">Details</h3>
                            <button
                                type='button'
                                onClick={toggleDetails}
                                className="mb-4 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Edit Details
                            </button>
                        </div>
                        <p className="text-left mb-4">{detail}</p>
                        <div className='flex w-full justify-between'>
                            <div className='flex flex-col '>
                                <p>Select a theme for your answer</p>
                            </div>
                            <div className="relative inline-block text-left">
                                <div>
                                    <button
                                        onClick={optionsClick}
                                        type="button"
                                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        {selectedTheme}
                                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                {showOptions && (
                                    <div className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                        <div className="py-1" role="none">
                                            {
                                                themes.map((l, i) => {
                                                    const selectOption = () => {
                                                        setSelectedTheme(themes[i]);
                                                        setShowOptions(!showOptions);
                                                    };

                                                    return (
                                                        <button
                                                            key={i}
                                                            onClick={selectOption}
                                                            className={`text-gray-700 w-full block px-4 py-2 text-sm ${selectedTheme === themes[i] ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}
                                                        >
                                                            {themes[i]}
                                                        </button>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <ChatWithGPT
                            documentID={profileId}
                            setKey={`${setKey}.starStory`}
                            message={message}
                            currentState={currentState}
                            saveToDatabase={updateProfileAction}
                            temp={0.7}
                        />
                    </>
                )}
            </div>
        </>

    );
}
