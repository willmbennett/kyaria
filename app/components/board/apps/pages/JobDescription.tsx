'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { createJobApplicationAction } from "../../../../board/apps/[id]/_action";
import { emails } from "../../../../board/job-helper";
import { useRouter } from 'next/navigation'

const BUTTON_GREEN = "inline-block rounded px-6 pb-2 pt-2.5 text-xs hover:opacity-80 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]";

export type FormFields = {
    board: string;
  };

export default function JobDescription({
    jobData,
    addBoard,
    profile
}: {
    jobData: any,
    addBoard?: boolean,
    profile?: any
}) {
    const router = useRouter()

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        if (profile) {
            const path = "/"
            const resume = { ...profile };
            delete resume._id
            const userApp = {
                job: jobData,
                profileId: profile._id,
                resume: resume,
                userId: profile.userId,
                emails: emails
            }
            //console.log('Creating App')
            console.log(userApp)
            const jobApp = await createJobApplicationAction(userApp, path);
            router.push(`/board/apps/${jobApp}`)
        }
    };

    const { register, handleSubmit } = useForm<FormFields>();

    return (

        <>
            <h1 className="text-center sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8 dark:text-neutral-50">
                {jobData.jobTitle}
            </h1>
            <div>
                <div className="flex items-center justify-center">
                    {jobData.link && (
                        <p className="text-left font-medium text-lg mb-4 mx-2">
                            <a href={jobData.link} target="_blank" rel="noopener noreferrer">
                                <button
                                    className={BUTTON_GREEN}
                                    type="button"
                                    style={{ backgroundColor: '#00703C' }}
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >
                                    Apply to Job
                                </button>
                            </a>
                        </p>
                    )}
                    {addBoard && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <p className="text-left font-medium text-lg mb-4 mx-2">
                            <input {...register('board')} placeholder="board" className="hidden"/>
                            <button
                                className={BUTTON_GREEN}
                                type="submit"
                                style={{ backgroundColor: '#00703C' }}
                                data-te-ripple-init
                                data-te-ripple-color="light"
                            >
                                Add to Board
                            </button>
                        </p>
                        </form>
                    )}
                </div>
                {jobData.company && (
                    <p className="text-left font-medium text-lg mb-4">
                        <strong>Company:</strong> {jobData.company}
                    </p>
                )}
                {jobData.location && (
                    <p className="text-left font-medium text-lg mb-4">
                        <strong>Location:</strong> {jobData.location}
                    </p>
                )}
                {jobData.employmentType && (
                    <p className="text-left font-medium text-lg mb-4">
                        <strong>Employment Type:</strong> {jobData.employmentType}
                    </p>
                )}
                {jobData.salaryRange && (
                    <p className="text-left font-medium text-lg mb-4">
                        <strong>Salary Range:</strong> {jobData.salaryRange}
                    </p>
                )}
                {jobData.remote && (
                    <p className="text-left font-medium text-lg mb-4">
                        <strong>Remote:</strong> {jobData.remote}
                    </p>
                )}
                {jobData.aboutCompany && (<>
                    <h2 className="text-left font-bold text-2xl mb-4">About the Company</h2>
                    <p className="text-left mb-8">
                        {jobData.aboutCompany}
                    </p>
                </>)}
                {jobData.jobDescription && (<>
                    <h2 className="text-left font-bold text-2xl mb-4">Job Description</h2>
                    <p className="text-left mb-8">
                        {jobData.jobDescription}
                    </p>
                </>)}
                {jobData.qualifications && (
                    <>
                        <h2 className="text-left font-bold text-2xl mb-4">Qualifications</h2>
                        <ul className="list-disc list-inside text-left mb-8">
                            {Array.isArray(jobData.qualifications) && jobData.qualifications.map((qualification: any, index: any) => (
                                <li key={index}>{qualification}</li>
                            ))}
                        </ul>
                    </>)}
                {jobData.responsibilities && (
                    <>
                        <h2 className="text-left font-bold text-2xl mb-4">Responsibilities</h2>
                        <ul className="list-disc list-inside text-left">
                            {Array.isArray(jobData.responsibilities) && jobData.responsibilities.map((responsibility: any, index: any) => (
                                <li key={index}>{responsibility}</li>
                            ))}
                        </ul>
                    </>)}
            </div>
        </>
    );
}
