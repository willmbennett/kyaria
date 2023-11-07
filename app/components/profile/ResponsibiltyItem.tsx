import ProfileTextEdit from "./ProfileTextEdit";
import { useState } from "react";
import { Button } from "../Button";
import ChatWithGPT from "../board/ChatWithGPT";
import { updateProfileAction } from "../../profile/_action";

export const ResponsibilityItem = (
    {
        responsibility,
        profileId,
        experienceIndex,
        responsibilityIndex,
        userCanEdit
    }: {
        responsibility: any,
        profileId: string,
        experienceIndex: number,
        responsibilityIndex: number,
        userCanEdit: boolean
    }) => {
    const [add, setAdd] = useState(false)
    const [active, setActive] = useState(false);
    const toggleAdd = () => {
        setAdd(!add)
        setActive(true)
    };

    const toggleActive = () => {
        setActive(!active);
    };

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
            content: `Create a STAR story for this resume accomplishment: "${responsibility.content}". 
            ${responsibility.detail ? `Here are some details about the achievement: ${responsibility.detail}` : ""}
            Refine the story. 
            `
        }
    ]

    return (
        <li className="flex bg-slate-100 my-2 p-2 rounded-xl w-full">
            <div className="flex flex-col space-y-2 w-full">
                <h4 className="text-left font-bold text-lg mb-2">Accomplishment</h4>
                {responsibility.content && (
                    <ProfileTextEdit
                        profileId={profileId}
                        setKey={`professional_experience.${experienceIndex}.responsibilities.${responsibilityIndex}.content`}
                        currentState={responsibility.content || ''}
                        userCanEdit={userCanEdit}
                        deleatable={true}
                    />
                )}
                {(responsibility.detail || add) && (<>
                    <h4 className="text-left font-bold text-lg mb-2">Details</h4>
                    <div className="p-2 mb-2 rounded-xl">
                        {responsibility.detail && (
                            <button
                                className='inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                onClick={toggleActive}
                            > See details
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                        {active && (
                            <div className='p-3 w-full'>
                                <ProfileTextEdit
                                    profileId={profileId}
                                    setKey={`professional_experience.${experienceIndex}.responsibilities.${responsibilityIndex}.detail`}
                                    currentState={responsibility.detail || ''}
                                    userCanEdit={userCanEdit}
                                    stateStart={add}
                                    toggleAdd={toggleAdd}
                                />
                            </div>
                        )}
                    </div>
                </>)}
                {!responsibility.detail && userCanEdit && (<div>
                    <Button
                        type="button"
                        className="py-1 my-2 px-3 border-none"
                        size="md"
                        variant={add ? "ghost" : "solid"}
                        onClick={toggleAdd}
                    >
                        {add ? "Cancel" : "Add Details"}
                    </Button>
                </div>
                )}
                {!userCanEdit && responsibility.starStory &&
                    <ProfileTextEdit
                        profileId={profileId}
                        setKey={`professional_experience.${experienceIndex}.responsibilities.${responsibilityIndex}.starStory`}
                        currentState={responsibility.starStory || ''}
                        userCanEdit={userCanEdit}
                    />
                }
                {userCanEdit &&
                    <div className="p-3 w-full">
                        <h4 className="text-left font-bold text-lg mb-2">Interview Story</h4>
                        <ChatWithGPT
                            documentID={profileId}
                            setKey={`professional_experience.${experienceIndex}.responsibilities.${responsibilityIndex}.starStory`}
                            message={message}
                            currentState={responsibility.starStory}
                            saveToDatabase={updateProfileAction}
                            temp={0.7}
                        />
                    </div>
                }

            </div>
        </li>
    );
}
