import { getResumes } from "../../../../lib/resume-db";
import { ResumeClass } from "../../../../models/Resume";
import { checkSubscription } from "../../../../lib/hooks/check-subscription";
import { redirect } from "next/navigation";
import { Email } from "../../../components/email/Email";
import { getPerson } from "../../../../lib/person-db";
import { PersonClass } from "../../../../models/Person";

type getResumesType = {
    resumes: ResumeClass[]
}
type getPersonType = {
    person: Partial<PersonClass>
}

export default async function EmailPage({ params }: { params: { id: string } }) {
    const { userId } = await checkSubscription()
    console.log('userId: ', userId)
    const { resumes } = await getResumes(userId) as getResumesType
    const { person } = await getPerson(params.id) as getPersonType

    // If no resumes redirect to resume builder
    if (resumes.length == 0) {
        redirect("/resumebuilder")
    }

    if (!person) {
        return <p>Sorry person not found</p>
    }

    return (
        <div className='flex flex-col space-y-10'>
            <div className='flex flex-col space-y-2'>
                <h1 className="text-center sm:text-6xl text-4xl font-bold text-slate-900 mb-8">
                    AI Powered Emails
                </h1>
                <Email
                    resumes={resumes}
                    person={person}
                />
            </div>
        </div>
    );
}
