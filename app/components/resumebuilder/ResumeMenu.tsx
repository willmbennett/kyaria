import { ResumeClass } from '../../../models/Resume';
import { Button } from '../Button';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

interface ResumeListMenuProps {
    resumeIndex: string | null;
    setResumeIndex: (resume: string | null) => void;
    resumes: ResumeClass[];
    activeSubscription: boolean;
}

const ResumeListMenu: React.FC<ResumeListMenuProps> = ({
    resumeIndex,
    setResumeIndex,
    resumes,
    activeSubscription
}) => {
    const router = useRouter();

    const handleItemClick = (resumeId: string) => {
        setResumeIndex(resumeId);
        router.refresh();
    };

    return (
        <div className="md:sticky md:top-60 flex flex-col p-3 h-1/2 space-y-1 border border-slate-200 rounded-md">
            <div className='flex flex-row items-center justify-between w-full mb-2'>
                <p className="text-sm md:text-md lg:text-lg font-semibold">Resumes</p>
                {activeSubscription ?
                    <a className='duration-150 ease-in-out inline-flex items-center justify-center font-medium group px-2 py-1.5 text-sm bg-slate-700 text-white hover:bg-slate-900 ml-3' href='/resumebuilder/new'>New Resume</a> :
                    <Button href='/pricing' size='sm'>Subscribe to add new</Button>
                }
            </div>
            <ul className='h-full w-full overflow-y-scroll bg-white border border-slate-100 bg-slate-50 p-2 shadow-md space-y-1'>
                {resumes.map((resume, index) => (
                    <li key={resume._id.toString()}
                        className={`flex items-center justify-center p-1 h-auto space-y-1 
                    ${resume._id === resumeIndex
                                ? 'border border-slate-600 shadow bg-slate-500 text-white cursor-default'
                                : 'bg-slate-200 cursor-pointer'}`}>
                        <div onClick={resume._id !== resumeIndex ? () => handleItemClick(resume._id.toString()) : undefined}
                            className="px-2 py-1.5 w-full rounded text-sm">
                            <p className='text-xs'>{`${resume.createdAt
                                ? format(new Date(resume.createdAt), 'MM/yyyy')
                                : resumes.length - index} - ${resume.title || resume.name}`}</p>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default ResumeListMenu;
