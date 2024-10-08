'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { createJobApplicationAction } from "../../../../_action";
import { emails } from "../../../../../board/job-helper";
import { useRouter } from 'next/navigation'
import { Button } from "../../../../../components/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { EditJobDescription } from "./EditJobDescription";
import Link from "next/link";
import { EditList } from "./EditList";
import { JobClass } from "../../../../../../models/Job";
import { useEffect, useState } from "react";

export type FormFields = {
    board: string;
};

export default function JobDescription({
    jobData,
    addBoard,
    profile,
    topWords,
    companyDiffbotId,
    currentUserId
}: {
    jobData: any,
    addBoard?: boolean,
    profile?: any,
    topWords: string[],
    companyDiffbotId?: string | null
    currentUserId: string
}) {
    const router = useRouter()
    const [editingMode, setEditingMode] = useState(false)

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
                emails: emails,
                userStory: profile.story
            }
            //console.log('Creating App')
            //console.log(userApp)
            const jobApp = await createJobApplicationAction(userApp, path);
            router.push(`/board`)
        }
    };

    // This will clear the data from local storage from the onboarding flow
    useEffect(() => {
        const resume = localStorage.getItem('onboardingResume')
        const application = localStorage.getItem('onboardingApplication')

        if (resume) localStorage.removeItem('onboardingResume')
        if (application) localStorage.removeItem('onboardingApplication')
    }, [])

    const { register, handleSubmit } = useForm<FormFields>();

    const { _id,
        jobTitle,
        userId,
        company,
        location,
        employmentType,
        salaryRange,
        remote,
        aboutCompany,
        jobDescription,
        qualifications,
        responsibilities,
        companyDiffbotUri
    }: JobClass = jobData;

    const jobId = _id.toString()

    const userCanEdit = (currentUserId == '650f813286f63a9d8c0080ee' || currentUserId == userId)

    const edit = userCanEdit && editingMode

    return (

        <div className="w-full max-w-3xl">
            <h1 className="text-center text-3xl sm:text-5xl font-bold text-slate-900 my-8">
                <EditJobDescription
                    jobId={jobId}
                    setKey={`jobTitle`}
                    currentState={jobTitle}
                    userCanEdit={edit}
                />
            </h1>
            <div className="space-y-6">
                <div className="flex gap-2">
                    {jobData.link && (
                        <div className="text-center">
                            <a href={jobData.link} target="_blank" rel="noopener noreferrer">
                                <Button variant="solid" size="md">
                                    View Original Post
                                </Button>
                            </a>
                        </div>
                    )}
                    {userCanEdit &&
                        <Button size="sm" variant="ghost" onClick={() => setEditingMode(!editingMode)}>
                            {editingMode ? 'Exit Edit Mode' : 'Edit Mode'}
                        </Button>
                    }
                    {addBoard && (
                        <div className="text-center">
                            {profile ? (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input {...register('board')} placeholder="board" className="hidden" />
                                    <Button variant="solid" type="submit" size="md">
                                        Add to Board
                                    </Button>
                                </form>
                            ) : (
                                <Button size="md" variant="solid" onClick={!profile ? () => signIn() : () => signOut()}>
                                    {!profile ? 'Sign In to Add to Board' : 'Sign Out'}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                <p className="text-lg font-medium">
                    <strong>Keywords:</strong> {topWords.join(', ')}
                </p>
                <div className="flex flex-wrap gap-3 justify-start items-center">
                    <EditJobDescription
                        label="Company"
                        jobId={jobId}
                        setKey={`company`}
                        currentState={company}
                        userCanEdit={edit}
                    />
                    {companyDiffbotId && (
                        <Button href={`/companies/${companyDiffbotId}`} size="sm" variant="secondary">
                            {`See more about ${company}`}
                        </Button>
                    )}
                </div>
                <div className="space-y-4">
                    <EditJobDescription
                        label="Location"
                        jobId={jobId}
                        setKey={`location`}
                        currentState={location}
                        userCanEdit={edit}
                    />
                    <EditJobDescription
                        label="Employment Type"
                        jobId={jobId}
                        setKey={`employmentType`}
                        currentState={employmentType || ''}
                        userCanEdit={edit}
                    />
                    <EditJobDescription
                        label="Salary Range"
                        jobId={jobId}
                        setKey={`salaryRange`}
                        currentState={salaryRange || ''}
                        userCanEdit={edit}
                    />
                    <EditJobDescription
                        label="Remote"
                        jobId={jobId}
                        setKey={`remote`}
                        currentState={remote || ''}
                        userCanEdit={edit}
                    />
                </div>
                <h2 className="text-2xl font-bold mb-4">About the Company</h2>
                <EditJobDescription
                    jobId={jobId}
                    setKey={`aboutCompany`}
                    currentState={aboutCompany || ''}
                    userCanEdit={edit}
                    useMarkdown={true}
                />
                <h2 className="text-2xl font-bold mb-4">Job Description</h2>
                <EditJobDescription
                    jobId={jobId}
                    setKey={`jobDescription`}
                    currentState={jobDescription || ''}
                    userCanEdit={edit}
                    useMarkdown={true}
                />
                <h2 className="text-2xl font-bold mb-4">Qualifications</h2>
                <EditList
                    listItems={qualifications || []}
                    id={jobId}
                    userCanEdit={edit}
                    parentName='qualifications'
                />
                <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
                <EditList
                    listItems={responsibilities || []}
                    id={jobId}
                    userCanEdit={edit}
                    parentName='responsibilities'
                />
            </div>
        </div>

    );
}
