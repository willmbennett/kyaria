import Script from "next/script";

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="w-screen min-h-screen">
            {/* Event snippet for conversion tracking */}
            <Script
                id="gtag-conversion"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            gtag('event', 'conversion', {'send_to': 'AW-11370402046/IauhCJ6r040ZEP6h6q0q'});
          `,
                }}
            />
            {children}
        </div>);
}