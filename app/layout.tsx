import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import SessionProvider from './components/SessionProvider'
import NavMenu from './components/NavMenu';
import '../styles/globals.css';
import { authOptions } from '../lib/auth';
import { getServerSession } from "next-auth/next"
import Footer from './components/Footer';

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
          <Footer />
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}