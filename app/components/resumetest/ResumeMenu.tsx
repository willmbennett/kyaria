import { ResumeScanDataClass } from '../../../models/ResumeScan';

const ACTIVE_ROUTE = "text-gray-600 bg-gray-200 font-bold hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "text-gray-600 font-bold hover:bg-gray-600 hover:text-white";


interface ResumeListMenuProps {
    resumeScans: ResumeScanDataClass[];
    setResumeTest: (resume: ResumeScanDataClass) => void;
    resumeTest?: ResumeScanDataClass | null;
    setFormHidden: (arg: boolean) => void;
}

const ResumeListMenu: React.FC<ResumeListMenuProps> = ({ resumeScans, setResumeTest, resumeTest, setFormHidden }) => {
    // Function to handle clicking on a resume scan
    const handleResumeClick = (resumeScan: ResumeScanDataClass) => {
        setResumeTest(resumeScan);
        setFormHidden(true)
    };

    return (
        <div className="sticky bg-white border w-full lg:top-60 bg-gray-200 p-4 lg:rounded-lg h-auto my-2">
            <div className=" w-full items-center items-start  flex flex-col lg:h-auto py-2 overflow-scroll">
                <p>Resumes Scans</p>
                <ul>
                    {resumeScans.map((resume, index) => (

                        <li key={index} onClick={() => handleResumeClick(resume)}>
                            <div className={`inline-flex w-auto w-full px-3 py-1 my-1 rounded text-xl lg:text-lg items-center justify-center ${resume._id === resumeTest?._id ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}>
                                <p>{resumeScans.length - index} - {new Date(resume.createdAt).toLocaleDateString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    );
};

export default ResumeListMenu;
