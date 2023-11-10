import { Metadata } from 'next';
import FeedbackAside from '../../components/FeedbackAside';

const title = 'Launch Your Career';
const description = 'Launch your career with the power of AI';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.kyaria.ai/'),
    title,
    description,
    openGraph: {
        title,
        description,
        locale: 'en_US',
        type: 'website',
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

    return (<div className='flex flex-col w-full md:flex-row justify-center'>
        {children}
        <div>
            <FeedbackAside />
        </div>
    </div>);
}