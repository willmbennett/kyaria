import { Key } from "react";
import { EducationDetailItem } from "./EductionDetailItem";

export const EducationItem = (
    { 
        education, 
        profileId, 
        index 
    } : {
        education: any
        profileId: string
        index: number
    }
    ) => {
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
                </ul>
            )}
        </div>
    );
}
