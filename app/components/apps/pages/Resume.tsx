"use server"
import { ResumeClass } from '../../../../models/Resume';
import CustomPDFViewer from '../../resumebuilder/pdfviewer/CustomPDFViewer';
import { ResumeSelection } from './Resume/ResumeSelect';

interface ResumeProps {
    userResume: ResumeClass;
    userId: string;
    jobId: string;
    jobAppId: string;
}

export default async function Resume({
    userResume,
    userId,
    jobId,
    jobAppId
}: ResumeProps) {

    return (
        <div className='w-full h-full over relative items-center gap-4 max-w-xl'>
            <h1 className="text-center sm:text-4xl text-4xl font-bold mb-8">
                Stand out with a Tailored Resume
            </h1>
            {/* @ts-ignore */}
            <ResumeSelection userId={userId} jobAppId={jobAppId} currentResume={userResume._id.toString()} />
            <CustomPDFViewer
                data={userResume}
                useEdit={true}
                userId={userId}
                useSave={true}
                jobId={jobId}
            />
        </div>
    );
}
