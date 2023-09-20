import React, { useState } from 'react';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import { FormFields } from '../../jobs/job-helper'
//import { redirect } from 'next/navigation'
import FieldArray from './FieldArray';
import { createNewJob } from '../../jobs/job-helper';
import { ProfileClass } from '../../../models/Profile';
import { JobClass } from '../../../models/Job';
import { createJobAction } from '../../jobs/[id]/_action';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

export default function NewJobForm({
    defaultValue,
    values,
    setCreatingJob,
    userId,
    userResume,
    setFormView
}: {
    defaultValue: any,
    values: any,
    setCreatingJob: any,
    userId: string,
    userResume: any,
    setFormView: any
}) {

    const { register, handleSubmit, control } = useForm<FormFields>({
        defaultValues: { ...defaultValue },
        values
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log("Creating Job")
        const addDetails = {
            ...data,
            userId: userId,
            userCoverLetter: "",
            userResume: userResume,
            userStory: ""
        }
        console.log(addDetails.userCoverLetter)
        console.log(addDetails)
        const path = "/"
        const res = await createJobAction(addDetails, path);
        console.log(res)
        setCreatingJob(false)
        setFormView(false)
        //redirect(`/`) // Navigate to new route
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-left font-bold text-2xl py-4 mb-4">Details</h2>
            <div className={BASIC_FIELD_STYLE}>
                <p>Job Title</p>
                <input {...register('jobTitle')} placeholder="Job Title" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Company</p>
                <input {...register('company')} placeholder="Company" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Location</p>
                <input {...register('location')} placeholder="Location" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Employment Type</p>
                <input {...register('employmentType')} placeholder="Employment Type" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Salary Range</p>
                <input {...register('salaryRange')} placeholder="Salary Range" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Remote</p>
                <input {...register('remote')} placeholder="Remote" />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>About the Company</p>
                <textarea {...register('aboutCompany')} placeholder="About the company" rows={5} cols={50} />
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Job Description</p>
                <textarea {...register('jobDescription')} placeholder="Job Description" rows={5} cols={50} />
            </div>
            <h2 className="text-left font-bold text-2xl py-4 mb-4">Qualifications</h2>
            <FieldArray
                control={control}
                register={register}
                name='qualifications'
            />
            <h2 className="text-left font-bold text-2xl py-4 mb-4">Responsibilities</h2>
            <FieldArray
                control={control}
                register={register}
                name='responsibilities'
            />
            {/* Submit */}
            <div className={BASIC_FIELD_STYLE}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="submit">Submit</button>
            </div>
        </form>
    );
}
