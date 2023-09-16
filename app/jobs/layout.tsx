import JobsContextProvider from '../components/jobs/JobsContext';


export default function JobLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode,
}) {

  return (
    <>
      <JobsContextProvider>
      {children}
      </JobsContextProvider>
    </>
  )
}