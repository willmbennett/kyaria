import { Metadata } from 'next';
import { Container } from '../components/landingpage/Container';
import { checkSubscription } from '../../lib/hooks/check-subscription';
import { Button } from '../components/Button';
import { redirect } from 'next/navigation';

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
        redirect('/')
    }

    return (
        <div className='min-h-screen'>
            <section className="flex w-full justify-center pt-16 md:pt-20 xl:pt-32">
                {/* Hero section content */}
                <Container className="flex justify-center w-full">
                    <div className="flex flex-col justify-center w-full max-w-5xl">
                        <div className='pb-10'>
                            <Button size='sm' variant='ghost' href={`/profile/${userId}`}>← Back to Profile</Button>
                        </div>
                        {/* Hero text and buttons */}
                        {children}
                    </div>
                </Container>
            </section>
        </div>
    )
}