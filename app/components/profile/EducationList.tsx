import { EducationItem } from "./EducationItem";
import { updateProfileAction } from "../../profile/_action";
import { usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import { Button } from "../Button";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import NestedFieldArray from "./NestedFieldArray";

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

const newEducation = {
    degree: "",
    institution: "",
    location: "",
    details: [{
        content: "",
        detail: "",
    }]
};

export type FormFields = {
    education: {
        degree: string;
        institution: string;
        location: string;
        start_date: string;
        end_date: string;
        details: {
            content: string;
            detail: string;
            starStory: string;
        }[];
    };
};


export const EducationList = (
    {
        educationItems,
        profileId,
        userCanEdit
    }: {
        educationItems: any,
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
            const setKey = `education.${educationItems.length}`
            //console.log(`"${setKey}":"${formData}"`)
            const data = JSON.parse(`{"${setKey}":""}`)
            data[setKey] = formData.education
            //console.log(profileId, data)
            const update = await updateProfileAction(profileId, data, "/")
            router.push(path, { scroll: false })
            setAdd(false)
        }
    };

    const newExperienceId = educationItems.length

    return (

        <>
            <h2 className="text-left font-bold text-2xl py-4 mb-4 border-b">Education</h2>
            {
                educationItems.map((edu: any, index: number) => (
                    <EducationItem education={edu} profileId={profileId} index={index} key={index} userCanEdit={userCanEdit} />
                ))
            }

            {add && userCanEdit && (<>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div key={newExperienceId} className="ext-left font-bold text-2xl mb-4">
                        <div className={BASIC_FIELD_STYLE}>
                            <p>Degree</p>
                            <input {...register(`education.degree`)} placeholder="Degree" />
                        </div>
                        <div className={BASIC_FIELD_STYLE}>
                            <p>Institution</p>
                            <input {...register(`education.institution`)} placeholder="Institution" />
                        </div>
                        <div className={BASIC_FIELD_STYLE}>
                            <p>Location</p>
                            <input {...register(`education.location`)} placeholder="Location" />
                        </div>
                        <div className={BASIC_FIELD_STYLE}>
                            <p>Start Date</p>
                            <input {...register(`education.start_date`)} placeholder="Start Date" />
                        </div>
                        <div className={BASIC_FIELD_STYLE}>
                            <p>End Date</p>
                            <input {...register(`education.end_date`)} placeholder="End Date" />
                        </div>
                        <div className={BASIC_FIELD_STYLE}>
                            <p>Details</p>
                            <NestedFieldArray
                                {...{
                                    control,
                                    register,
                                    parentIndex: newExperienceId,
                                    parentName: "education",
                                    childName: "details"
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
                        {add ? "Cancel" : "Add Education"}
                    </Button>
                </div>
            )}
        </>
    );
}
