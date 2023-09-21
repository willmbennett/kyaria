'use client'

export default function Page({ params }: { params: { session: any } }) {
  return (
    <div className='top-0 absolute w-full'>
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 p-5 text-center">
            Launch your career with AI
            {params.session}
        </h1>
      </div>
    </div>
  );
}
