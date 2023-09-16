import React, { useState } from 'react';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import NestedFieldArray from './NestedFieldArray';
import emptyProfile from '../../../examples/profile_format.json';
import { FormFields, createUserProfile } from '../../profile/profile-helper';
//import { redirect } from 'next/navigation'

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

export default function NewProfileForm({
    defaultValue,
    setUserProfile,
    setHasProfile,
    userId
}: {
    defaultValue: any,
    setUserProfile: any,
    setHasProfile: any,
    userId: string
}) {

    const { register, handleSubmit, control } = useForm<FormFields>({
        defaultValues: defaultValue
    });

    const { fields: experienceFields, append: appendExperience } = useFieldArray({
        control,
        name: 'professional_experience',
    });

    const { fields: educationFields, append: appendEducation } = useFieldArray({
        control,
        name: 'education',
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const newUser = await createUserProfile({ data, userId });
        console.log(newUser)
        setUserProfile(newUser);
        setHasProfile(true)
        //redirect(`/`) // Navigate to new route
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-left font-bold text-2xl py-4 mb-4">Details</h2>
            <div className={BASIC_FIELD_STYLE}>
                <p>Name</p>
                <input {...register('name')} placeholder="Name" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Job Title</p>
                <input {...register('title')} placeholder="Title" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Email</p>
                <input {...register('email')} placeholder="Email" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Phone Number</p>
                <input {...register('phone')} placeholder="Phone" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Github URL</p>
                <input {...register('social_links.Github')} placeholder="GitHub" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>LinkedIn URL</p>
                <input {...register('social_links.LinkedIn')} placeholder="LinkedIn" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Location</p>
                <input {...register('location')} placeholder="Location" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Summary</p>
                <input {...register('summary')} placeholder="Summary" />
            </div>

            <h2 className="text-left font-bold text-2xl py-4 mb-4">Expertise & Skills</h2>
            <div className={BASIC_FIELD_STYLE}>
                <p>Areas of Expertise</p>
                <Controller
                    name="areas_of_expertise"
                    control={control}
                    render={({ field }) => (
                        <input {...field} placeholder="Areas of Expertise (comma separated)" />
                    )}
                />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Skills</p>
                <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => <input {...field} placeholder="Skills (comma separated)" />}
                />
            </div>

            <h2 className="text-left font-bold text-2xl py-4 mb-4">Professional Experience</h2>
            {experienceFields.map((field, index) => (
                <div key={field.id} className="ext-left font-bold text-2xl mb-4">
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Title</p>
                        <input {...register(`professional_experience.${index}.title`)} placeholder="Title" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Company</p>
                        <input {...register(`professional_experience.${index}.company`)} placeholder="Company" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Location</p>
                        <input {...register(`professional_experience.${index}.location`)} placeholder="Location" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Start Date</p>
                        <input {...register(`professional_experience.${index}.start_date`)} placeholder="Start Date" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>End Date</p>
                        <input {...register(`professional_experience.${index}.end_date`)} placeholder="End Date" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Responsibilities</p>
                        <NestedFieldArray
                            {...{
                                control,
                                register,
                                parentIndex: index,
                                parentName: "professional_experience",
                                childName: "responsibilities"
                            }}
                        />
                    </div>
                </div>
            ))}
            <div className={BASIC_FIELD_STYLE}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="button" onClick={() => appendExperience({
                    title: "Title",
                    company: "Company",
                    location: "Title",
                    start_date: "Start Date",
                    end_date: "End Date",
                    responsibilities: [{content: "", starStory: ""}]
                })}>
                    Add Experience
                </button>
            </div>

            <h2 className="text-left font-bold text-2xl py-4 mb-4">Eduation</h2>
            {educationFields.map((field, index) => (
                <div key={field.id} className={BASIC_FIELD_STYLE}>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Degree</p>
                        <input {...register(`education.${index}.degree`)} placeholder="Degree" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Institution</p>
                        <input {...register(`education.${index}.institution`)} placeholder="Institution" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Location</p>
                        <input {...register(`education.${index}.location`)} placeholder="Location" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Details</p>
                        <NestedFieldArray
                            {...{
                                control,
                                register,
                                parentIndex: index,
                                parentName: "education",
                                childName: "details"
                            }}
                        />
                    </div>
                </div>
            ))}
            <div className={BASIC_FIELD_STYLE}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="button" onClick={() => appendEducation({
                    degree: "Degree",
                    institution: "Institution",
                    location: "Location",
                    details: {content: "", starStory: ""}
                })}>
                    Add Education
                </button>
            </div>

            {/* Submit */}
            <div className={BASIC_FIELD_STYLE}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="submit">Submit</button>
            </div>
        </form>
    );
}
