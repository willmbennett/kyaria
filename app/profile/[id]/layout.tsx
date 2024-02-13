import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { checkSubscription } from '../../../lib/hooks/check-subscription';
import { Container } from '../../components/landingpage/Container';
import FeedbackAside from '../../components/landingpage/FeedbackAside';

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
            <section className="flex flex w-full justify-center pt-5 md:pt-8 xl:pt-10">
                {/* Hero section content */}
                <Container className="flex flex-row justify-center w-full">
                    {/* Hero text and buttons */}
                    {children}
                    <div className="w-full md:w-1/4">
                        <FeedbackAside />
                    </div>
                </Container>

            </section>
        </div>
    )
}