import { usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import { updateProfileAction } from '../../profile/_action';
import { Button } from "../Button";
import ProfileTextEdit from "./ProfileTextEdit";
import { ResponsibilityItem } from "./ResponsibiltyItem";

export const ProfessionalExperienceItem = (
    {
        experience,
        profileId,
        index,
        userCanEdit
    }: {
        experience: any,
        profileId: string,
        index: number,
        userCanEdit: boolean
    }) => {
    const [add, setAdd] = useState(false)
    const router = useRouter()
    const path = usePathname()
    const [active, setActive] = useState(false);
    const toggleAdd = () => {
        setAdd(!add)
    };
    const toggleActive = () => {
        setActive(!active);
    };

    const deleteItem = async () => {
        if (userCanEdit) {
            // Split the property path into segments
            const setKey = `professional_experience.${index}.show`
            console.log(setKey)

            const data = JSON.parse(`{"${setKey}":false}`)
            console.log(profileId, data)
            await updateProfileAction(profileId, data, "/")
            router.push(path, { scroll: false })
        }
    };
    return (
        <div className="mb-8">
            <div className='flex flex-row justify-between'>
                <h3 className="text-left font-bold text-lg">
                    <ProfileTextEdit
                        profileId={profileId}
                        setKey={`professional_experience.${index}.title`}
                        currentState={experience.title || ''}
                        userCanEdit={userCanEdit}
                    />
                </h3>
                {userCanEdit && (
                    <Button
                        type="button"
                        className="py-1 px-3 border-none"
                        size="md"
                        variant='secondary'
                        onClick={deleteItem}
                    >
                        Delete
                    </Button>
                )}
            </div>
            <ProfileTextEdit
                label="Company"
                profileId={profileId}
                setKey={`professional_experience.${index}.company`}
                currentState={experience.company || ''}
                userCanEdit={userCanEdit}
            />
            <ProfileTextEdit
                label="Location"
                profileId={profileId}
                setKey={`professional_experience.${index}.location`}
                currentState={experience.location || ''}
                userCanEdit={userCanEdit}
            />
            <ProfileTextEdit
                label="Start Date"
                profileId={profileId}
                setKey={`professional_experience.${index}.start_date`}
                currentState={experience.start_date || ''}
                userCanEdit={userCanEdit}
            />
            <ProfileTextEdit
                label="End Date"
                profileId={profileId}
                setKey={`professional_experience.${index}.end_date`}
                currentState={experience.end_date || ''}
                userCanEdit={userCanEdit}
            />
            <button
                className='inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                onClick={toggleActive}
            > Show accomplishments
                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </button>
            {active && (<ul className="list-disc list-inside text-left mb-8">
                {experience.responsibilities && experience.responsibilities.map((resp: any, i: number) => (
                    (resp.show === null || resp.show !== false) ? (
                        <ResponsibilityItem
                            responsibility={resp}
                            profileId={profileId}
                            experienceIndex={index}
                            responsibilityIndex={i}
                            userCanEdit={userCanEdit}
                            key={i}
                        />
                    ) : null
                ))}
                {add && userCanEdit && (
                    <ProfileTextEdit
                        profileId={profileId}
                        setKey={`professional_experience.${index}.responsibilities.${experience.responsibilities.length}.content`}
                        currentState=''
                        userCanEdit={userCanEdit}
                        stateStart={true}
                        toggleAdd={toggleAdd}
                    />)}
                {userCanEdit && (
                    <Button
                        type="button"
                        className="py-1 my-2 px-3 border-none"
                        size="md"
                        variant={add ? "ghost" : "solid"}
                        onClick={toggleAdd}
                    >
                        {add ? "Remove New Accomplishment" : "Add New Accomplishment"}
                    </Button>
                )}
            </ul>
            )}
        </div>
    );
}
