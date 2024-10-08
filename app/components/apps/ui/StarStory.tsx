'use client'

import ChatWithGPT from '../../chat/ChatWithGPT';
import { useCallback, useEffect, useState } from 'react';
import { updateResumeAction } from '../../../resumebuilder/_action';
import { JobClass } from '../../../../models/Job';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../Button';
import DropdownMenu from './DropdownMenu';
import { Message } from 'ai';

type QuestionFormFields = {
    details: string
};

interface StarStoryProps {
    resumeId: string;
    originalResumeId?: string;
    userId: string,
    item: {
        _id?: string;
        content?: string;
        detail?: string;
        starStory?: string;
    };
    jobStripped: Partial<JobClass>;
    parentIndex: number;
    childIndex: number;
    userCanEdit: boolean;
}

export default function StarStory({
    resumeId,
    originalResumeId,
    userId,
    item,
    jobStripped,
    parentIndex,
    childIndex,
    userCanEdit
}: StarStoryProps) {
    const [showOptions, setShowOptions] = useState(false);
    const { _id, content, detail, starStory } = item
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
    const setKey = `professional_experience.${parentIndex}.responsibilities.${childIndex}`

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };


    const message: Message[] = [
        {
            "id": '1',
            "role": "system",
            "content": `You are an advanced career coach specialized in crafting compelling STAR stories, follow-up questions, and answers. 
            Tone: conversational, spartan, use less corporate jargon

            The user will give you a situation and some details and you will provide:
            - A concise STAR story (it should take less than 30 seconds to say) 
            - 3-4 follow up questions ${selectedTheme == '' ? '' : `with the theme of ${selectedTheme}`}. If the result has a quantifiable metric ask about it.
            - Answers to those follow up questionså
            - 1 follow up question about an answer
            
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

            ### **Example Follow-up questions:** 

            **Example follow-up Question 1: You mentioned that the system was initially plagued with a high error rate. What qualifies as a “high” error rate, and what was the reason for this?**
            
            Answer: Sure, happy to give some details. I can’t provide an exact figure on the error rate due to confidentiality, but I can say that the existing error rate at the time was high enough that it was a significant blocker to the business’ path to profitability – especially in such a low-margin business such as Whole Foods delivery. The reason for the error was a lack of investment in legacy Whole Foods systems, which changed when I joined, where leadership began to place much more scrutiny on profitability levers like forecasting accuracy.

            **Example Follow-up Question 2: Exactly what refinements did you make to the forecasting model which led to improvements?**
            
            Answer: Great question – first-off our Machine Learning team owned the tactical execution of backend model improvements. They worked with a Principal Economist to define a test plan, where they leveraged historical data to test several different methods ranging from simple moving average, to statistical methods like ARIMA, to Machine Learning methods such as Artificial Neural Networks. The final decision came down to ARIMA vs. the Artificial Neural Network, where we had to make a tradeoff on explainability vs. forecasting accuracy. As the business prioritized maximizing accuracy above all else, we landed on the Artificial Neural Network approach, which delivered the 35% accuracy improvement I mentioned.

            **Example Follow-up Question 3: You mention that you reduced the forecasting error by 35%, which led to 10 million in cost savings. How did you calculate this, what data did you use?**
            
            Answer: For the 35% forecasting error, we conducted a 50/50 AB test based on actual sales data vs forecasted volumes to arrive at the forecasting improvement. This metric was rigorously tracked throughout development, as it was the primary KPI for success. For the $10M cost savings, we utilized operational data on labor cost per unit to figure out cost savings from avoiding volume over-forecasts.

            **Example Follow-up Question 4: You mentioned that you led a team to improve the forecasting model. What kind of team was this, and in what ways were you a leader?**
            
            Answer: To complete this project, I led a team of 5 data scientists, who were responsible for the backend machine learning forecasting model, as well as 2 engineers who worked on building out the front end of the system. As the PM, I led the team by defining the product vision and getting buy-in for the final product from 20+ stakeholders, including VP level leadership. I owned the strategic roadmap and prioritization for the project, communicated project status to leadership, and handled any escalations with partner teams that were required to unblock the project.
            
            **Follow-up to the follow-up answer: Can you give me an example of an escalation you handled?**
            
            Answer: The most critical one for this project was a situation where a partner tech team refused us access to make required code changes in their system, as they did not want to take on the resulting liability. This was a launch blocking issue. After attempting negotiation at the manager level, I quickly escalated to the team’s senior leadership and my senior leadership. We set a meeting where I clearly communicated the business case, as well as a proposed mitigation plan for any potential issues. This resolved the conflict and we were ultimately approved to make the required code changes.
          `
        },
        {
            "id": '2',
            role: "user",
            content: `Create a STAR story ${selectedTheme == '' ? '' : `with the theme of ${selectedTheme}`} for this resume achievement: "${content}". 
            ${detail ? `Here are some details about the achievement: ${detail}` : ""}
            Refine the story and tailor it to this job post: ${JSON.stringify(jobStripped)}.
            `
        }
    ]

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<QuestionFormFields>({
        defaultValues: { details: detail }
    });

    const onSubmit: SubmitHandler<QuestionFormFields> = async (data: any) => {
        const { details } = data

        const savedData: { [key: string]: any } = {};
        savedData[`${setKey}.detail`] = details; // Set the detail property to the details provided.

        //console.log(profileId, savedData)
        const updateResume = await updateResumeAction(resumeId, savedData, "/")
        //console.log("Updated Resume:", updateResume);

        if (originalResumeId) {
            const updateResume = await updateResumeAction(originalResumeId, savedData, "/")
        }
        setShowDetails(false)
    };

    // Keep track of changes to the star story and update the original

    const updateStarStory = useCallback(async () => {
        if (starStory && originalResumeId) {
            const savedData: { [key: string]: any } = {};
            savedData[`${setKey}.starStory`] = starStory; // Set the detail property to the details provided.
            const updateResume = await updateResumeAction(originalResumeId, savedData, "/")
        }
    }, [starStory, originalResumeId])

    useEffect(() => {
        updateStarStory()
    }, [updateStarStory])

    const defaultMessage = `To make the best story possible add details such as: 
- What the business impact of the project was.
- Who you worked with to deliver this project.
- What challenges you overcame.
- What tools/tech did you use.
- How you went above and beyond your role.
`

    return (
        <div className="rounded-xl flex flex-col gap-3">
            <h3 className="mb-2 text-left font-bold">Accomplishment</h3>
            <p className="mb-4 text-slate-400">{content}</p>

            {showDetails ? (
                <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                    <div className="mb-3">
                        <label htmlFor="details" className="mb-2 block text-sm font-medium text-gray-700">
                            Add some details on your accomplishment to improve your story
                        </label>
                        <textarea
                            {...register("details", { required: true })}
                            id="details"
                            rows={10}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder={defaultMessage}
                        />
                        {errors.details && <p className="mt-1 text-xs text-red-600">Please specify your experience.</p>}
                    </div>
                    <div className='flex flex-row gap-4'>
                        <Button type="submit" size="md">Add Details</Button>
                        <Button type="button" size="md" variant="ghost" onClick={toggleDetails}>Cancel</Button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <h3 className="mb-2 text-left font-bold">Details</h3>
                        <Button
                            type="button"
                            onClick={toggleDetails}
                            variant="ghost"
                            size="sm"
                        >
                            Edit Details
                        </Button>
                    </div>
                    {detail && <p className="pb-4 text-slate-400">{detail}</p>}
                    <div className="flex justify-between w-full">
                        <div className="flex flex-col">
                            <p>Select a theme for your answer</p>
                        </div>
                        <DropdownMenu
                            selectedTheme={selectedTheme}
                            setSelectedTheme={setSelectedTheme}
                            showOptions={showOptions}
                            setShowOptions={setShowOptions}
                            themes={themes}
                        />
                    </div>
                    <ChatWithGPT
                        documentID={resumeId}
                        setKey={`${setKey}.starStory`}
                        message={message}
                        currentState={starStory || ''}
                        parentIndex={parentIndex}
                        childIndex={childIndex}
                        saveToDatabase={updateResumeAction}
                        temp={0.7}
                        activeSubscription={true}
                    />
                </>
            )}
        </div>


    );
}
