import { useState } from "react";
import { Button } from "../Button";
import ProfileTextEdit from "./ProfileTextEdit";
import { EducationDetailItem } from "./EductionDetailItem";

export const EducationItem = (
    {
        education,
        profileId,
        index,
        userCanEdit
    }: {
        education: any,
        profileId: string,
        index: number,
        userCanEdit: boolean
    }) => {
    const [add, setAdd] = useState(false);
    const [active, setActive] = useState(false);
    const toggleAdd = () => {
        setAdd(!add);
    };
    const toggleActive = () => {
        setActive(!active);
    };

    return (
        <div className="mb-8">
            <h3 className="text-left font-bold text-lg mb-2">
                <ProfileTextEdit
                    profileId={profileId}
                    setKey={`education.${index}.degree`}
                    currentState={education.degree || ''}
                    userCanEdit={userCanEdit}
                />
            </h3>
            <ProfileTextEdit
                label="Institution"
                profileId={profileId}
                setKey={`education.${index}.institution`}
                currentState={education.institution || ''}
                userCanEdit={userCanEdit}
            />
            <ProfileTextEdit
                label="Location"
                profileId={profileId}
                setKey={`education.${index}.location`}
                currentState={education.location || ''}
                userCanEdit={userCanEdit}
            />
            {/* Add Start Date */}
            <ProfileTextEdit
                label="Start Date"
                profileId={profileId}
                setKey={`education.${index}.start_date`}
                currentState={education.start_date || ''}
                userCanEdit={userCanEdit}
            />

            {/* Add End Date */}
            <ProfileTextEdit
                label="End Date"
                profileId={profileId}
                setKey={`education.${index}.end_date`}
                currentState={education.end_date || ''}
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
            {active && (
                <ul className="list-disc list-inside text-left mb-8">
                    {education.details && education.details.map((detail: any, i: number) => (
                        (detail.show === null || detail.show !== false) ? (
                            <EducationDetailItem
                                detail={detail}
                                profileId={profileId}
                                educationIndex={index}
                                userCanEdit={userCanEdit}
                                detailIndex={i}
                                key={i}
                            />
                        ) : null

                    ))}
                    {add && userCanEdit && (
                        <ProfileTextEdit
                            profileId={profileId}
                            setKey={`education.${index}.details.${education.details.length}.content`}
                            currentState=''
                            userCanEdit={userCanEdit}
                            stateStart={true}
                            toggleAdd={toggleAdd}
                        />
                    )}
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
