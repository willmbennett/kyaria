'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { createJobApplicationAction } from "../../../board/_action";
import { emails } from "../../../board/job-helper";
import { useRouter } from 'next/navigation'
import { Button } from "../../Button";
import { signIn, signOut, useSession } from "next-auth/react";
import EditJobDescription from "../EditJobDescription";
import Link from "next/link";
import { EditList } from "../EditList";

export type FormFields = {
    board: string;
};

export default function JobDescription({
    jobData,
    addBoard,
    profile,
    topWords,
}: {
    jobData: any,
    addBoard?: boolean,
    profile?: any,
    topWords: string[]
}) {
    const router = useRouter()
    const { data: session } = useSession()

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
            //console.log(userApp)
            const jobApp = await createJobApplicationAction(userApp, path);
            router.push(`/board`)
        }
    };

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
        responsibilities
    } = jobData;

    const edit = session?.user?.id == '650f813286f63a9d8c0080ee' || session?.user?.id == userId

    return (

        <>
            <h1 className="text-center sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                <EditJobDescription
                    jobId={_id}
                    setKey={`jobTitle`}
                    currentState={jobTitle}
                    userCanEdit={edit}
                />
            </h1>
            <div>
                <div className="flex items-center justify-center">
                    {jobData.link && (
                        <p className="text-left font-medium text-lg mb-4 mx-2">
                            <a href={jobData.link} target="_blank" rel="noopener noreferrer">
                                <Button
                                    variant="solid"
                                    size="md"
                                >
                                    View Original Post
                                </Button>
                            </a>
                        </p>
                    )}
                    {addBoard && (<>
                        {profile ? (
                            <>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <p className="text-left font-medium text-lg mb-4 mx-2">
                                        <input {...register('board')} placeholder="board" className="hidden" />
                                        <Button
                                            variant="solid"
                                            type="submit"
                                            size="md"
                                        >
                                            Add to Board
                                        </Button>
                                    </p>
                                </form>
                            </>
                        ) : (
                            <>
                                <p className="text-left font-medium text-lg mb-4 mx-2">
                                    <Button
                                        size="md"
                                        variant="solid"
                                        onClick={!profile ? () => signIn() : () => signOut()}
                                    >
                                        {!profile ? 'Sign In to Add to Board' : 'Sign Out'}
                                    </Button>
                                </p>
                            </>
                        )}
                    </>)}
                </div>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Keywords:</strong> {topWords.join(', ')}
                </p>
                <EditJobDescription
                    label="Company"
                    jobId={_id}
                    setKey={`company`}
                    currentState={company}
                    userCanEdit={edit}
                />
                <Link href={`/companies/${company}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline inline-block mr-2"
                >
                    See more information on {company}
                </Link>
                <EditJobDescription
                    label="Location"
                    jobId={_id}
                    setKey={`location`}
                    currentState={location}
                    userCanEdit={edit}
                />
                <EditJobDescription
                    label="Employment Type"
                    jobId={_id}
                    setKey={`employmentType`}
                    currentState={employmentType}
                    userCanEdit={edit}
                />
                <EditJobDescription
                    label="Salary Range"
                    jobId={_id}
                    setKey={`salaryRange`}
                    currentState={salaryRange}
                    userCanEdit={edit}
                />
                <EditJobDescription
                    label="Remote"
                    jobId={_id}
                    setKey={`remote`}
                    currentState={remote}
                    userCanEdit={edit}
                />
                <h2 className="text-left font-bold text-2xl mb-4">About the Company</h2>
                <EditJobDescription
                    jobId={_id}
                    setKey={`aboutCompany`}
                    currentState={aboutCompany}
                    userCanEdit={edit}
                />
                <h2 className="text-left font-bold text-2xl mb-4">Job Description</h2>
                <EditJobDescription
                    jobId={_id}
                    setKey={`jobDescription`}
                    currentState={jobDescription}
                    userCanEdit={edit}
                />
                <h2 className="text-left font-bold text-2xl mb-4">Qualifications</h2>
                <EditList
                    listItems={qualifications}
                    id={_id}
                    userCanEdit={edit}
                    parentName='qualifications'
                />
                <h2 className="text-left font-bold text-2xl mb-4">Responsibilities</h2>
                <EditList
                    listItems={responsibilities}
                    id={_id}
                    userCanEdit={edit}
                    parentName='responsibilities'
                />
            </div>
        </>
    );
}
