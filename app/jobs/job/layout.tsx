import JobMenu from '../../components/jobs/JobMenu';

export default function JobsLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-gray-100">
            <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-10">
                <div className="flex flex-1 w-full">
                    <div className="w-1/4">
                        <JobMenu />
                    </div>
                    <div className="flex flex-1 w-full flex-col items-center text-center p-8">
                    {children}
                    </div>
                </div>
            </main>
        </div>
      </section>
    )
  }