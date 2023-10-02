"use client"

import React, { useState } from 'react';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import NestedFieldArray from './NestedFieldArray';
import emptyProfile from '../../../examples/profile_format.json';
import { FormFields, createUserProfile, defaultTextInput } from '../../profile/profile-helper';
import { createProfileAction, updateProfileAction } from '../../profile/_action';
import ProfileActions from './ProfileActions';
import { ProfileClass } from '../../../models/Profile';
import { demoJSON, expectedJson } from '../../profile/profile-helper';
import UserProfile from './UserProfile';
import TextToJSON from '../TextToJSON';
//import { redirect } from 'next/navigation'
import { Button } from '../Button';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'
const H2_STYLE = 'text-left font-bold text-2xl py-4 mb-4'

export default function Profile({
    userId,
    profile,
    sessionUserId
}: {
    userId: string
    profile?: ProfileClass,
    sessionUserId?: string
}) {
    const [formView, setFormView] = useState(false)
    const [inputTextView, setInputTextView] = useState(true)
    const defaultValue = {
        name: profile?.name || expectedJson.name,
        title: profile?.title || expectedJson.title,
        email: profile?.email || expectedJson.email,
        phone: profile?.phone || expectedJson.phone,
        social_links: profile?.social_links || expectedJson.social_links,
        location: profile?.location || expectedJson.location,
        summary: profile?.summary || expectedJson.summary,
        areas_of_expertise: profile?.areas_of_expertise || expectedJson.areas_of_expertise,
        skills: profile?.skills || expectedJson.skills,
        professional_experience: profile?.professional_experience || expectedJson.professional_experience,
        education: profile?.education || expectedJson.education
    }

    const [values, setValues] = useState()
    const [error, setError] = useState('')

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormFields>({
        defaultValues: defaultValue,
        values
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
        // call server action
        if (profile) {
            //console.log("Editing Profile")
            const path = "/"
            const res = await updateProfileAction(profile._id, data, path);
            //console.log(res)
        } else {
            //console.log("Creating Profile")
            const addUserId = { ...data, userId: userId }
            //console.log(addUserId)
            const path = "/"
            const { profile, error } = await createProfileAction(addUserId, path);
            if (error) {
                setError(error)
            }
            //console.log(profile, error)
        }
        setFormView(false)
    };

    const skipButton = () => {
        setFormView(true)
        setInputTextView(false)
    };

    const redoClick = () => {
        setInputTextView(true)
        setError('')
    };

    return (
        <>
            {error && (
                <>
                    <h2 className="sm:text-4xl text-2xl font-bold text-slate-900 mb-8 bg-red-100 text-red-600 p-10">
                        Email already exists
                    </h2>
                    <Button
                        variant="solid"
                        size="md"
                        onClick={redoClick}
                        className="mt-10 sm:mt-12"
                    >
                        Get started
                    </Button>
                </>
            )}
            {!error && sessionUserId == userId && !profile && inputTextView && (
                <div>
                    <div className='py-4'>
                        <h1 className="sm:text-6xl text-4xl font-bold text-slate-900 mb-8">
                            Welcome!
                        </h1>
                        <h2 className="sm:text-4xl text-2xl font-bold text-slate-900 mb-8">
                            Time to create your profile
                        </h2>
                    </div>
                    <TextToJSON
                        setValues={setValues}
                        expectedJson={expectedJson}
                        defaultTextInput={['development', 'preview'].includes(process.env.NEXT_PUBLIC_VERCEL_ENV || '') ? defaultTextInput : ''}
                        demoJSON={demoJSON}
                        inputTextType='resume'
                        setFormView={setFormView}
                        setInputTextView={setInputTextView}
                    />
                    <p className="mt-10 text-sm text-base text-neutral-600 w-full max-w-screen">
                        Don't have a resume? That's totally fine! Fill out this form to get started.
                    </p>
                    <Button
                        variant="ghost"
                        size="md"
                        onClick={skipButton}
                        className="mt-3"
                    >
                        Go to Form
                    </Button>
                </div>)}
            {sessionUserId == userId && profile && (<ProfileActions
                id={profile._id}
                formView={formView}
                setFormView={setFormView}
            />)}
            {profile && !formView && (<UserProfile userProfile={profile} />)}
            {formView && (
                <div className="p-6">
                    <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                        {profile? "Edit your profile": "Create your profile"}
                    </h1>
                    {!profile && (<p>Don't worry too much, you can always edit this later.</p>)}
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
                                    responsibilities: [{ content: "", detail: "", starStory: "" }]
                                })}
                                className="mt-10 sm:mt-12"
                            >
                                Add Experience
                            </Button>
                        </div>

                        <h2 className={H2_STYLE}>Eduation</h2>
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
                            <Button
                                variant="solid"
                                size="md"
                                type="button"
                                onClick={() => appendEducation({
                                    degree: "Degree",
                                    institution: "Institution",
                                    location: "Location",
                                    details: [{ content: "", detail: "", starStory: "" }]
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
                                {profile? "Save changes": "Create My Profile"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </>);
}
