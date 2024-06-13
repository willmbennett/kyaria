'use client'
import { Button } from '../../../components/Button';
import { useSearchParams } from 'next/navigation';
import JobAppUploader from './JobAppUploader';

export default function CreateJobApp(
    {
        userId,
        profileId,
        story = '',
        userResume
    }: {
        userId: string,
        profileId: string,
        story?: string;
        userResume?: string;
    }) {
    const sp = useSearchParams()
    const boardId = sp.get('board')

    return (
        <> <div className='flex pb-3'>
            <Button size='sm' variant='ghost' href={`/board${boardId ? `/${boardId}` : '/default'}`}>← Back to Board</Button>
        </div>
            <h1 className="pb-10 text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-6xl xl:leading-tighter">
                Add a new Job Application
            </h1>
            <JobAppUploader
                userId={userId}
                profileId={profileId}
                story={story}
                userResume={userResume}
                boardId={boardId}
            />
        </>
    );
}