import { Metadata } from 'next';
import SessionProvider from './components/SessionProvider'
import '../styles/globals.css';
import { authOptions } from '../lib/auth';
import { getServerSession } from "next-auth/next"
import Script from 'next/script';
import clsx from 'clsx'
import { Inter } from 'next/font/google'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TooltipProvider } from './components/ui/tooltip';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

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
    <html lang="en" className='bg-white'>
      <body className={clsx('min-h-screen font-sans', inter.variable)}>
        {/*<Script
          id="ze-snippet"
          src="https://static.zdassets.com/ekr/snippet.js?key=135d1136-b2c1-4d54-8610-58a0b79632da"
  />*/}
        <Script dangerouslySetInnerHTML={{
          __html: `
              !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){if(window.analytics.initialized)return window.analytics[e].apply(window.analytics,arguments);var i=Array.prototype.slice.call(arguments);i.unshift(e);analytics.push(i);return analytics}};for(var i=0;i<analytics.methods.length;i++){var key=analytics.methods[i];analytics[key]=analytics.factory(key)}analytics.load=function(key,i){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=i};analytics._writeKey="wayhHKaPEXQc0mIChRaLHikN33jwEIKM";;analytics.SNIPPET_VERSION="4.16.1";
              analytics.load("wayhHKaPEXQc0mIChRaLHikN33jwEIKM");
              analytics.page();
              }}();
            `
        }} />
        {session?.user?.id && (
          <Script dangerouslySetInnerHTML={{
            __html: `
            !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_dx53gyf7fp62', {"optOut":false,"useDecimalCurrencyValues":true,"email":"${session.user.email}","externalId":"${session.user.id}"});rdt('track', 'PageVisit');
            `
          }} />
        )}
        <SessionProvider session={session}>
          <TooltipProvider >
            <Header />
            {children}
            <Footer />
          </TooltipProvider >
        </SessionProvider>
      </body>
    </html>
  );
}