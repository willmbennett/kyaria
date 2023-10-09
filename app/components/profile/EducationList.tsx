import { Key } from "react";
import { EducationItem } from "./EducationItem";

export const EducationList = ({ educationItems, profileId }: { educationItems: any, profileId: string }) => {
    return (
        <>
            <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b">Education</h2>
            {educationItems.map((edu: any, index: number) => (
                <EducationItem education={edu} profileId={profileId} index={index} key={index} />
            ))}
        </>
    );
}
