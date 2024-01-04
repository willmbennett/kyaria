import { Metadata } from 'next';

const title = "Kyaria.ai Insights: Mastering Job Search & Career Growth with AI";
const description = "Explore Kyaria.ai's blog for expert insights on AI-powered job hunting and career advancement. Dive into tips on creating ATS-friendly resumes, acing interviews with AI mock sessions, and effective networking strategies. Stay ahead in your career with our latest AI tools and beta features, designed for job seekers and professionals seeking growth.";

export const metadata: Metadata = {
    metadataBase: new URL('https://www.kyaria.ai/resumebuilder'),
    title,
    description,
    openGraph: {
        title,
        description,
        locale: 'en_US',
        type: 'website',
        url: 'https://www.kyaria.ai/resumebuilder'
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
        <div className="mx-auto w-full p-0 pb-14 md:mx-0 md:max-w-none md:pb-48 lg:pb-52 xl:max-w-5xl xl:pb-14">
            {children}
        </div>);
}