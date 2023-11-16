import { ResumeScanDataClass } from '../../../../models/ResumeScan';

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
        <div className="sticky top-60 lg:rounded-lg bg-gray-200 border p-4 my-2 w-full h-auto">
            <div className="flex flex-col items-start py-2 overflow-auto w-full">
                <p className="text-lg font-semibold mb-2">Resumes Scans</p>
                <ul className="w-full">
                    {resumeScans.map((resume, index) => (
                        <li key={index} onClick={() => handleResumeClick(resume)} className="my-1">
                            <div className={`inline-flex items-center justify-center w-full px-3 py-1 rounded text-lg cursor-pointer hover:bg-gray-300 ${resume._id === resumeTest?._id ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                                <p>{resumeScans.length - index} - {new Date(resume.createdAt).toLocaleDateString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default ResumeListMenu;
