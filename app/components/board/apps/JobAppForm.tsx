import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormFields, emails } from '../../../board/job-helper'
import FieldArray from './FieldArray';
import { createJobApplicationAction } from '../../../board/apps/[id]/_action';
import { useRouter } from 'next/navigation'

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

export default function NewJobAppForm({
    defaultValue,
    values,
    setCreatingJob,
    userId,
    profile,
    setFormView
}: {
    defaultValue: any,
    values: any,
    setCreatingJob: any,
    userId: string,
    profile: any,
    setFormView: any
}) {
    const router = useRouter()

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormFields>({
        defaultValues: { ...defaultValue },
        values
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const path = "/"
        const profileId = profile._id
        const resume = profile
        delete resume._id
        const userApp = {
            job: data,
            profileId: profileId,
            resume: resume,
            userId: userId,
            emails: emails
        }
        //console.log('Creating App')
        console.log(userApp)
        const jobApp = await createJobApplicationAction(userApp, path);
        //console.log('Created App')
        //console.log(jobApp)
        setCreatingJob(false)
        setFormView(false)
        router.push(`/board/apps/${jobApp}`)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-left font-bold text-2xl py-4 mb-4">Details</h2>
            <div className={BASIC_FIELD_STYLE}>
                <p>Job Title</p>
                <input {...register('jobTitle', { required: true })} placeholder="Job Title"/>
                            {errors.jobTitle && <p>Please check your job title</p>}
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Link</p>
                <input type="url" {...register('link', { required: true, pattern: /^(http|https):\/\/[a-z0-9\.-]+\.[a-z]{2,}/i })} placeholder="https://www.examplejob.com/awesomejob"/>
                            {errors.link && <p>Please check your link</p>}
            </div>
            <div className={BASIC_FIELD_STYLE}>
                <p>Company</p>
                <input {...register('company', { required: true })} placeholder="Company"/>
                            {errors.company && <p>Please check your company name</p>}
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
                <button
                    className="inline-block rounded px-6 pb-2 pt-2.5 text-xs hover:opacity-80 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
                    style={{ backgroundColor: '#00703C' }}
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
