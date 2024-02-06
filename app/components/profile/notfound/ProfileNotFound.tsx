import { Button } from "../../Button";

export const ProfileNotFound = ({ userId }: { userId: string }) => {

    return (
        <div className='py-4 flex flex-col items-center justify-center text-center'>
            <h1 className="sm:text-6xl text-4xl font-bold text-slate-900 mb-8">We're sorry</h1>
            <h2 className="sm:text-4xl text-2xl font-bold text-slate-900 mb-8">This profile doesn't exist</h2>
            <Button href={`/profile/${userId}`} size='lg'>
                Go to my profile
            </Button>
        </div>
    );
};
