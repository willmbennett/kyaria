import ProfileTextEdit from "./ProfileTextEdit";
import { useState } from "react";
import { Button } from "../Button";

export const EducationDetailItem = (
    { detail, profileId, educationIndex, detailIndex }:
        { detail: any, profileId: string, educationIndex: number, detailIndex: number }
) => {
    const [add, setAdd] = useState(false);
    const [active, setActive] = useState(false);

    const toggleAdd = () => {
        setAdd(!add);
        setActive(true);
    };

    const toggleActive = () => {
        setActive(!active);
    };

    return (
        <li className="flex bg-slate-100 my-2 p-2 rounded-xl w-full">
            <div className="flex flex-col space-y-2 w-full">
                <h4 className="text-left font-bold text-lg mb-2">Accomplishment</h4>
                {detail.content && (
                    <ProfileTextEdit
                        profileId={profileId}
                        setKey={`education.${educationIndex}.details.${detailIndex}.content`}
                        currentState={detail.content || ''}
                    />
                )}
                {(detail.detail || add) && (<>
                    <h4 className="text-left font-bold text-lg mb-2">Details</h4>
                    <div className="p-2 mb-2 rounded-xl">
                        {detail.detail && (
                            <button
                                className='inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                onClick={toggleActive}
                            >
                                See details you added
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                        {active && (
                            <div className='p-3 w-full'>
                                <ProfileTextEdit
                                    profileId={profileId}
                                    setKey={`education.${educationIndex}.details.${detailIndex}.detail`}
                                    currentState={detail.detail || ''}
                                    stateStart={add}
                                    toggleAdd={toggleAdd}
                                />
                            </div>
                        )}
                    </div>
                </>)}
                {!detail.detail && (
                    <div>
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
            </div>
        </li>
    );
}
