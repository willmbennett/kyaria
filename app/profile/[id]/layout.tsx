import { Container } from '../../components/landingpage/Container';
import FeedbackAside from '../../components/landingpage/FeedbackAside';

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='min-h-screen'>
            <section className="flex flex w-full justify-center pt-5 md:pt-8 xl:pt-10">
                <Container className="flex flex-col md:flex-row justify-center w-full">
                        {children}
                    <div className="w-full md:w-1/4">
                        <FeedbackAside />
                    </div>
                </Container>
            </section>
        </div>
    )
}