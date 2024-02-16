import { ResumeClass } from '../../../models/Resume';
import { Button } from '../Button';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import ResumeDropdownMenu from '../ResumeDropdownMenu';

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
        <div className="flex flex-row pb-10 space-x-3 justify-center items-center">
            <p className="text-sm md:text-md lg:text-lg font-semibold">Resumes</p>
            {resumeIndex &&
                <ResumeDropdownMenu
                    selectedResumeId={resumeIndex}
                    setSelectedResumeId={setResumeIndex}
                    resumes={resumes}
                />
            }
            {activeSubscription ?
                <a className='duration-150 ease-in-out inline-flex items-center justify-center font-medium group px-2 py-1.5 text-sm bg-slate-700 text-white hover:bg-slate-900 ml-3' href='/resumebuilder/new'>New Resume</a> :
                <Button href='/pricing' size='sm'>Subscribe to add new</Button>
            }
        </div>
    );
};

export default ResumeListMenu;
