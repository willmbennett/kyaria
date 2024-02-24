import { Metadata } from "next";

const title = "Streamline Your Job Search with Kyaria PRO Kanban Tracker";
const description = "Elevate your job search with Kyaria PRO's Kanban Tracker. Simplify application management with a drag-and-drop interface, keep all your resumes and cover letters in one place, and optimize your search with our intuitive funnel approach. Start your strategic job search campaign for only $10/mo.";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kyaria.ai/'),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: 'en_US',
    type: 'website',
    url: 'https://www.kyaria.ai/board'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};


export default function JobLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode,
}) {

  return (
    <div className="w-full">
      {children}
    </ div>
  )
}