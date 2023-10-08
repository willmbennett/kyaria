import { Metadata } from 'next';
import { TooltipProvider } from "../../components/ui/tooltip";

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

    return (
        <TooltipProvider >
            {children}
        </TooltipProvider >
    );
}