import CustomPDFViewer from '../../resumebuilder/pdfviewer/CustomPDFViewer';
import ResumeUploadPage from './ResumeUpload';

interface ResumeProps {
    userResume: any;
    userId: string;
    jobId: string;
}

export default function Resume({
    userResume,
    userId,
    jobId
}: ResumeProps) {

    return (
        <div className='w-full h-full over relative items-center gap-4 max-w-xl'>
            <h1 className="text-center sm:text-4xl text-4xl font-bold mb-8">
                Stand out with a Tailored Resume
            </h1>
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
