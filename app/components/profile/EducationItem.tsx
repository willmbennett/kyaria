import { useState } from "react";
import { Button } from "../Button";
import ProfileTextEdit from "./ProfileTextEdit";
import { EducationDetailItem } from "./EductionDetailItem";

export const EducationItem = (
    { education, profileId, index }:
        { education: any, profileId: string, index: number }
) => {
    const [add, setAdd] = useState(false);
    const toggleAdd = () => {
        setAdd(!add);
    };

    return (
        <div className="mb-8">
            <h3 className="text-left font-bold text-lg mb-2">{education.degree}</h3>
            <p className="text-left text-lg mb-2">{education.institution}, {education.location}</p>
            
            {education.details && (
                <ul className="list-disc list-inside text-left mb-8">
                    {education.details.map((detail: any, i: number) => (
                        <EducationDetailItem
                            detail={detail}
                            profileId={profileId}
                            educationIndex={index}
                            detailIndex={i}
                            key={i}
                        />
                    ))}
                    {add && (
                        <ProfileTextEdit
                            profileId={profileId}
                            setKey={`education.${index}.details.${education.details.length}.content`}
                            currentState=''
                            stateStart={true}
                            toggleAdd={toggleAdd}
                        />
                    )}
                    <Button
                        type="button"
                        className="py-1 my-2 px-3 border-none"
                        size="md"
                        variant={add ? "ghost" : "solid"}
                        onClick={toggleAdd}
                    >
                        {add ? "Remove New Detail" : "Add Accomplishment"}
                    </Button>
                </ul>
            )}
        </div>
    );
}
