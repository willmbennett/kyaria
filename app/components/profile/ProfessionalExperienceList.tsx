import { updateProfileAction } from "../../profile/_action";
import { ProfessionalExperienceItem } from "./ProfessionalExperienceItem";
import { usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import { Button } from "../Button";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import NestedFieldArray from "./NestedFieldArray";

const newExperience = {
    title: "",
    company: "",
    location: "",
    start_date: "",
    end_date: "",
    responsibilities: [{ content: "", detail: "", starStory: "" }]
}

export type FormFields = {
    professional_experience: {
        title: string;
        company: string;
        location: string;
        start_date: string;
        end_date: string;
        responsibilities: {
            content: string;
            detail: string;
            starStory: string;
        }[];
    };
};

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

export const ProfessionalExperienceList = (
    { experiences,
        profileId,
        userCanEdit
    }: {
        experiences: any,
        profileId: string,
        userCanEdit: boolean
    }) => {
    const [add, setAdd] = useState(false)
    const router = useRouter()
    const path = usePathname()

    const toggleAdd = () => {
        setAdd(!add)
    };

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormFields>({});

    // Save the final message to the database
    const onSubmit: SubmitHandler<FormFields> = async (formData) => {
        if (userCanEdit) {
            // Save the message to the database
            const setKey = `professional_experience.${experiences.length}`
            //console.log(`"${setKey}":"${formData}"`)
            const data = JSON.parse(`{"${setKey}":""}`)
            data[setKey] = formData.professional_experience
            //console.log(profileId, data)
            const update = await updateProfileAction(profileId, data, "/")
            router.push(path, { scroll: false })
            setAdd(false)
        }
    };

    const newExperienceId = experiences.length

    return (
        <>
            <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b">Professional Experience</h2>
            {experiences.length > 0 && experiences.sort((a: any, b: any) => {
                // Check if either a or b has 'present' as end_date
                if (a.end_date === 'present' && b.end_date !== 'present') {
                    return -1; // 'present' comes before other dates
                } else if (a.end_date !== 'present' && b.end_date === 'present') {
                    return 1; // 'present' comes before other dates
                } else {
                    // Compare the end_date values as timestamps (assuming they are in ISO date format)
                    const dateA = new Date(a.end_date).getTime();
                    const dateB = new Date(b.end_date).getTime();
                    return dateB - dateA; // Sort other dates in descending order
                }
            })
                .map((exp: any, index: number) => (
                    (exp.show === null || exp.show !== false) ? (
                        <ProfessionalExperienceItem
                            experience={exp}
                            profileId={profileId}
                            index={index}
                            key={index}
                            userCanEdit={userCanEdit}
                        />
                    ) : null
                ))}
            {add && userCanEdit && (<>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div key={newExperienceId} className="ext-left font-bold text-2xl mb-4">
                        <div className={BASIC_FIELD_STYLE}>
                            <p>Title</p>
                            <input {...register(`professional_experience.title`)} placeholder="Title" />
                        </div>
                        <div className={BASIC_FIELD_STYLE}>
                            <p>Company</p>
                            <input {...register(`professional_experience.company`)} placeholder="Company" />
                        </div>
                        <div className={BASIC_FIELD_STYLE}>
                            <p>Location</p>
                            <input {...register(`professional_experience.location`)} placeholder="Location" />
                        </div>
                        <div className={BASIC_FIELD_STYLE}>
                            <p>Start Date</p>
                            <input {...register(`professional_experience.start_date`)} placeholder="Start Date" />
                        </div>
                        <div className={BASIC_FIELD_STYLE}>
                            <p>End Date</p>
                            <input {...register(`professional_experience.end_date`)} placeholder="End Date" />
                        </div>
                        <div className={BASIC_FIELD_STYLE}>
                            <p>Responsibilities</p>
                            <NestedFieldArray
                                {...{
                                    control,
                                    register,
                                    parentIndex: newExperienceId,
                                    parentName: "professional_experience",
                                    childName: "responsibilities"
                                }}
                            />
                        </div>
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <Button
                            variant="solid"
                            size="md"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </>)}
            {userCanEdit && (
                <div className={BASIC_FIELD_STYLE}>
                    <Button
                        variant={add ? "ghost" : "solid"}
                        size="md"
                        type="button"
                        onClick={toggleAdd}
                        className=""
                    >
                        {add ? "Cancel" : "Add Experience"}
                    </Button>
                </div>
            )}
        </>
    );
}
