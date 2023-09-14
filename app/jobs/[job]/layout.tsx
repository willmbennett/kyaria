import JobMenu from '../../components/jobs/JobMenu';
import JobContextProvider from '../../components/jobs/JobContext';


export default function JobsLayout({
  children, // will be a page or nested layout
  params
}: {
  children: React.ReactNode,
  params: { job: string }
}) {
  const { job } = params

  return (
    <section>
      <JobContextProvider>
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-gray-100">
        <div className="flex flex-1 w-full flex-col items-center justify-center text-center lg:px-4 lg:mt-6">
          <div className="flex flex-1 w-full">
              <div className="w-1/4 hidden lg:flex lg:flex-col">
                <JobMenu
                  jobName={job}
                />
              </div>
              <div className="flex flex-1 w-full flex-col items-center text-center p-1 lg:p-8">
                {children}
              </div>
          </div>
        </div>
      </div>
      <div className='lg:hidden sticky bottom-0'>
        <JobMenu
          jobName={job}
        />
      </div>
      </JobContextProvider>
    </section>
  )
}