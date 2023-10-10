import { usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import { Button } from "../Button";
import ProfileTextEdit from "./ProfileTextEdit";
import { ResponsibilityItem } from "./ResponsibiltyItem";

export const ProfessionalExperienceItem = (
    { experience, profileId, index }:
        { experience: any, profileId: string, index: number }
) => {
    const [add, setAdd] = useState(false)
    const router = useRouter()
    const path = usePathname()
    const toggleAdd = () => {
        setAdd(!add)
      };

    return (
        <div className="mb-8">
            <h3 className="text-left font-bold text-lg mb-2">{experience.title} at {experience.company}</h3>
            <p className="text-left text-lg mb-2">{experience.location}</p>
            <p className="text-left text-lg mb-2">{experience.start_date} - {experience.end_date}</p>
            {experience.responsibilities && (
                <ul className="list-disc list-inside text-left mb-8">
                    {experience.responsibilities.map((resp: any, i: number) => (
                        <ResponsibilityItem
                            responsibility={resp}
                            profileId={profileId}
                            experienceIndex={index}
                            responsibilityIndex={i}
                            key={i}
                        />
                    ))}
                    {add && (
                    <ProfileTextEdit
                        profileId={profileId}
                        setKey={`professional_experience.${index}.responsibilities.${experience.responsibilities.length}.content`}
                        currentState=''
                        stateStart={true}
                        toggleAdd={toggleAdd}
                    />)}
                    <Button
                        type="button"
                        className="py-1 my-2 px-3 border-none"
                        size="md"
                        variant={add ? "ghost" : "solid"}
                        onClick={toggleAdd}
                    >
                        {add ? "Remove New Accomplishment" : "Add New Accomplishment"}
                    </Button>
                </ul>
            )}
        </div>
    );
}
