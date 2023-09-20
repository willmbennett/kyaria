import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import SessionProvider from './components/SessionProvider'
import NavMenu from './components/NavMenu';
import '../styles/globals.css';
import { authOptions } from '../lib/auth';
import { getServerSession } from "next-auth/next"

const title = 'Launch Your Career';
const description = 'Launch your career with the power of AI';

export const metadata: Metadata = {
  metadataBase: new URL('https://career-launcher-ai-k8og.vercel.app/'),
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <NavMenu />
              {children}
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}