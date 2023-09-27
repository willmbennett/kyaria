'use client'
import { signIn, useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <div className='w-full'>
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
        <h1 className="sm:text-6xl text-4xl font-bold text-slate-900 p-5 text-center">
          Launch your career with AI
        </h1>
        {!session && (
          <button
            onClick={() => signIn()}
            className="bg-black rounded-xl text-white text-2xl font-medium p-4 py-2 hover:bg-black/80"
          >
            Sign in
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row p-5">
        <div className="lg:w-1/3 lg:p-3 py-2">
          <a href={session?.user?.id ? `/profile/${session?.user?.id}` : "/"}>
            <div
              className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light">
                <img
                  className="rounded-t-lg"
                  src="/create-profile.jpg"
                  alt="" />

                <div
                  className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>

              </div>
              <div className="p-6">
                <h5
                  className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  1. Create a profile
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  Go to the Profile tab and copy  paste all your resume content into the text box. Don’t worry about formatting. After uploading, make sure the content is accurate, and add any additional details. This info will be used across all Jobs to populate interview prep materials.
                </p>
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal dark:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  Create Profile
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className="lg:w-1/3 lg:p-3 py-2">
          <a href={session?.user?.id ? `/jobs` : "/"}>
            <div
              className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light">
                <img
                  className="rounded-t-lg"
                  src="/add-job.jpg"
                  alt="" />
                <div
                  className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>

              </div>
              <div className="p-6">
                <h5
                  className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  2. Add a job post
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Next, we'll create tailored interview prep material for you. Find an online job posting page (for example one on Linkedin), ctrl a + ctrl c the job posting page, and paste the contents into the text box in the jobs tab in Kyaria. We'll scan your job post using AI and format it perfectly.
                </p>
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal dark:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  Add a job
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className="lg:w-1/3 lg:p-3 py-2">
          <a href={session?.user?.id ? `/jobs` : "/"}>
            <div
              className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light">
                <img
                  className="rounded-t-lg"
                  src="/interview-prep.jpg"
                  alt="" />
                <div
                  className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </div>
              <div className="p-6">
                <h5
                  className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  3. Get your results
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  Navigate to the Jobs tab, and click on the job you want to see the interview prep materials for. On the left hand side of the screen, you'll find a menu with a tailored resume, cover letters, networking emails, “tell me about yourself” story, and STAR format behavioral interview answers.
                </p>
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal dark:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  Profit
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
