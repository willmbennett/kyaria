import CustomPDFViewer from '../../resumebuilder/pdfviewer/CustomPDFViewer';

interface ResumeProps {
    userResume: any;
    activeSubscription: boolean;
    userId: string;
}

export default function Resume({
    userResume,
    activeSubscription,
    userId
}: ResumeProps) {

    return (
        <div className='w-full flex flex-col items-center gap-4'>
            <h1 className="text-center sm:text-6xl text-4xl font-bold mb-8">
                Stand out with a Tailored Resume
            </h1>
            <CustomPDFViewer
                data={userResume}
                useEdit={true}
                userId={userId}
                useSave={true}
                activeSubscription={activeSubscription}
            />
        </div>
    );
}
