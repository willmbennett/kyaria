import JobContextProvider from '../components/jobs/JobContext';


export default function JobLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode,
}) {

  return (
    <>
      <JobContextProvider>
      {children}
      </JobContextProvider>
    </>
  )
}