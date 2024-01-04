import { Metadata } from 'next';
import { Container } from '../components/landingpage/Container';

const title = "Kyaria.ai Insights: Mastering Job Search & Career Growth with AI";
const description = "Explore Kyaria.ai's blog for expert insights on AI-powered job hunting and career advancement. Dive into tips on creating ATS-friendly resumes, acing interviews with AI mock sessions, and effective networking strategies. Stay ahead in your career with our latest AI tools and beta features, designed for job seekers and professionals seeking growth.";

export const metadata: Metadata = {
    metadataBase: new URL('https://www.kyaria.ai/blog'),
    title,
    description,
    openGraph: {
        title,
        description,
        locale: 'en_US',
        type: 'website',
        url: 'https://www.kyaria.ai/blog'
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

    return (
        <section className="relative overflow-hidden bg-slate-100 pt-5 md:pt-10">
            <Container>
                <div className="flex flex-col items-center">
                    {children}
                </div>
            </Container>
        </section>
    );
}