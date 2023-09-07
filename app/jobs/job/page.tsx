'use client'
import demoJob from '../../../examples/example_job.json'
import JobMenu from '../../components/jobs/JobMenu';

export default function Page() {

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
            <div className='flex flex-1 w-full'>
                <div className="w-1/4 bg-white">
                    <JobMenu />
                </div>
                <div className='flex flex-1 w-full flex-col items-center justify-center text-center'>
                    <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
                        {demoJob["Job Title"]} @ {demoJob["Company"]}
                    </h1>
                    <p>
                        {demoJob["Job Description"]}
                    </p>
                </div>
            </div>
        </main>
    </div>
  );
}
