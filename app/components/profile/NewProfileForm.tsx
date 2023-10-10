"use client"

import React, { useState } from 'react';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import NestedFieldArray from './NestedFieldArray';
import { FormFields } from '../../profile/profile-helper';
import { createProfileAction } from '../../profile/_action';
import { ProfileClass } from '../../../models/Profile';
import { expectedJson } from '../../profile/profile-helper'
//import { redirect } from 'next/navigation'
import { Button } from '../Button';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'
const H2_STYLE = 'text-left font-bold text-2xl py-4 mb-4'

export default function NewProfileForm({
    userId,
    profile,
    setOnboardingStage
}: {
    userId: string
    profile?: ProfileClass,
    setOnboardingStage: any
}) {
    const [error, setError] = useState('')

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormFields>({
        defaultValues: expectedJson
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
        //console.log("Creating Profile")
        const addUserId = { ...data, userId: userId }
        //console.log(addUserId)
        const path = "/"
        await createProfileAction(addUserId, path);
        //console.log(profile, error)
        setOnboardingStage('questionaire')
    };

    return (
        <div className="p-6">
            <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                {profile ? "Edit your profile" : "Create your profile"}
            </h1>
            {!profile && (<p>You can edit this later, but the more detail added the better your results will be.</p>)}
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <h2 className={H2_STYLE}>Details</h2>
                <div className={BASIC_FIELD_STYLE}>
                    <p>Name</p>
                    <input {...register('name', { required: true })} placeholder="Name" />
                    {errors.name && <p>Please check your name</p>}
                </div>
                <div className={BASIC_FIELD_STYLE}>
                    <p>Job Title</p>
                    <input {...register('title', { required: true })} placeholder="Title" />
                    {errors.title && <p>Please check your title</p>}
                </div>
                <div className={BASIC_FIELD_STYLE}>
                    <p>Email</p>
                    <input
                        type="email"
                        {...register('email', {
                            required: true,
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                        placeholder="Email" />
                    {errors.email && <p>Please check your email</p>}
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

                <h2 className={H2_STYLE}>Expertise & Skills</h2>
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

                <h2 className={H2_STYLE}>Professional Experience</h2>
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
                    <Button
                        variant="solid"
                        size="md"
                        type="button"
                        onClick={() => appendExperience({
                            title: "Title",
                            company: "Company",
                            location: "Title",
                            start_date: "Start Date",
                            end_date: "End Date",
                            responsibilities: [{ content: "", detail: "" }]
                        })}
                        className="mt-10 sm:mt-12"
                    >
                        Add Experience
                    </Button>
                </div>

                <h2 className={H2_STYLE}>Education</h2>
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
                            <p>Start Date</p>
                            <input {...register(`education.${index}.start_date`)} placeholder="Start Date" />
                        </div>
                        <div className={BASIC_FIELD_STYLE}>
                            <p>End Date</p>
                            <input {...register(`education.${index}.end_date`)} placeholder="End Date" />
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
                    <Button
                        variant="solid"
                        size="md"
                        type="button"
                        onClick={() => appendEducation({
                            degree: "Degree",
                            institution: "Institution",
                            location: "Location",
                            start_date: "",
                            end_date: "",
                            details: [{ content: "", detail: ""}]
                        })}
                        className="mt-10 sm:mt-12"
                    >
                        Add Education
                    </Button>
                </div>
                {/* Submit */}
                <div className={`${BASIC_FIELD_STYLE} sticky bottom-0 p-3 bg-white shadow-md rounded-xl`}>
                    <Button
                        variant="solid"
                        size="md"
                        type="submit"
                    >
                        {profile ? "Save changes" : "Create My Profile"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
