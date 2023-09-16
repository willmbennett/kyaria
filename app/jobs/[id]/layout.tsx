import JobMenu from '../../components/jobs/job/JobMenu';


export default function JobLayout({
  children, // will be a page or nested layout
  params
}: {
  children: React.ReactNode,
  params: { id: number }
}) {
  const { id } = params

  return (
    <section>
      <div className="flex max-w-5xl mx-auto flex-col  py-2 min-h-screen bg-gray-100">
                {children}
      </div>
    </section>
  )
}