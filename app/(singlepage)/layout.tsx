import { Metadata } from 'next';
import { Container } from '../components/landingpage/Container';
import { checkSubscription } from '../../lib/hooks/check-subscription';
import { Button } from '../components/Button';
import { redirect } from 'next/navigation';
import { createProfile, getProfile } from '../../lib/profile-db';

const title = "Kyaria.ai's AI-Powered Bio Generator";
const description = "Leverage cutting edge AI to generate power";

export const metadata: Metadata = {
    metadataBase: new URL('https://www.kyaria.ai/'),
    title,
    description,
    openGraph: {
        title,
        description,
        locale: 'en_US',
        type: 'website',
        url: 'https://www.kyaria.ai/networking'
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
    },
};

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await checkSubscription()

    //For now just redirect the user home (no landing page)
    if (!userId) {
        return (
            <div className='min-h-screen'>
                {children}
            </div>
        )
    }

    return (
        <div className='flex w-full h-full justify-center sm:p-1 md:p-2 lg:p-3 xl:p-4'>
            {children}
        </div>
    )
}