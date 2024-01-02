import { Metadata } from 'next';

const title = "Kyaria.ai - Advanced AI Resume Builder for ATS Optimization";
const description = "Revolutionize your job hunt with Kyaria.ai's AI-powered Resume Builder. Craft ATS-optimized resumes easily and elevate your career prospects.";

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
        <div className="w-screen min-h-screen">
            {children}
        </div>);
}