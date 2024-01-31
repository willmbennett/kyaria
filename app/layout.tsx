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
import { SpeedInsights } from "@vercel/speed-insights/next"
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const title = 'Kyaria.ai | Launch Your Career with Our Advanced AI Resume Builder';
const description = "Kickstart your professional journey with Kyaria.ai's innovative AI-powered resume builder. Tailor your resume for success, stand out to employers, and find your dream job. Start now!";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kyaria.ai'),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: 'en_US',
    type: 'website',
    url: 'https://www.kyaria.ai'
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
      <Head>
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
        {/* Load the Google Tag Manager script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11370402046"
          strategy="afterInteractive" // This loads the script after the page has been interactively rendered
          async
        />

        {/* Inline script for Google Tag Manager configuration */}
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'AW-11370402046');
          `,
          }}
        />
        {/* Event snippet for Page view conversion */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('event', 'conversion', {'send_to': 'AW-11370402046/IauhCJ6r040ZEP6h6q0q'});
            `,
          }}
        />
        <Script dangerouslySetInnerHTML={{
          __html: `
            !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_dx53gyf7fp62', {"optOut":false,"useDecimalCurrencyValues":true,"email":"${session?.user?.email || ''}","externalId":"${session?.user?.id || ''}"});rdt('track', "${session?.user?.id ? 'PageVisit' : 'ViewContent'}" );
            `
        }} />

      </Head>
      <body className={clsx('min-h-screen font-sans', inter.variable)}>
        <SessionProvider session={session}>
          <TooltipProvider >
            <Header />
            {children}
            <Footer />
          </TooltipProvider >
        </SessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}