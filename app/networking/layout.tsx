import { Metadata } from 'next';

const title = "Kyaria.ai's AI-Powered Networking";
const description = "Discover and connect with industry leaders using Kyaria.ai. Enhance your professional networking strategy with our AI-driven insights and make meaningful connections that boost your career.";

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

    return (
        <div className='min-h-screen'>
            {children}
        </div>
    )
}