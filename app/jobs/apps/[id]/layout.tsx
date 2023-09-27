import JobMenu from '../../../components/jobs/apps/JobMenu';


export default function JobLayout({
  children, // will be a page or nested layout
  params
}: {
  children: React.ReactNode,
  params: { id: string }
}) {
  const { id } = params

  return (
    <section>
      <div className="flex max-w-5xl mx-auto flex-col py-2 min-h-screen bg-gray-100">
        <div className="lg:px-4 lg:mt-6">
          <div className="flex h-auto min-h-screen w-full lg:px-4 lg:mt-6">
            <div className="lg:w-1/4 hidden lg:flex lg:flex-col">
              <JobMenu
                id={id}
              />
            </div>
            <div className="lg:w-3/4 flex flex-col bg-white m-3 p-3 rounded-lg shadow-md">
              {children}
            </div>
          </div>
          <div className='lg:hidden sticky bottom-0 w-full'>
            <JobMenu
              id={id}
            />
          </div>
        </div>
      </div>
    </section>
  )
}