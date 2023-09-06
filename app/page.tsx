'use client'

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Footer from '../components/Footer';
import Github from '../components/GitHub';
import Header from '../components/Header';
import { useCompletion } from 'ai/react';
import profileData from '../examples/example_profile.json';
import { SessionProvider } from "next-auth/react"

export default function Page() {
  const [jobDescription, setJobDescription] = useState('');
  const summaryRef = useRef<null | HTMLDivElement>(null);

  const scrollToSummaries = () => {
    if (summaryRef.current !== null) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { completion, input, handleInputChange, handleSubmit, isLoading } =
  useCompletion({
      body: {
        message: [
          {
            role: "system",
            content: 
              `You are a professional resume writer.
              You will be provided with a text job description and a user profile in json format.
              Write a resume summary based on the data in user profile and tailor it to the job description.
              Keep the length under 4 sentances. 
              `
        },
        {
          role: "user",
          content: 
            `User Profile: ${profileData}
            Job description: ${jobDescription}     `
        }
        ]
      },
      onFinish() {
        scrollToSummaries();
      },
    });

  const onSubmit = (e: any) => {
    setJobDescription(input);
    handleSubmit(e);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/Nutlope/twitterbio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Customize your resume using chatGPT
        </h1>
        <p className="text-slate-500 mt-5">47,118 bios generated so far.</p>
        <form className="max-w-xl w-full" onSubmit={onSubmit}>
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Add a job description{' '}
              <span className="text-slate-500">
                (copy and paste from the website)
              </span>
              .
            </p>
          </div>
          <textarea
            value={input}
            onChange={handleInputChange}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              'e.g. Senior Developer Advocate @acmecorp...'
            }
          />
          <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              type="submit"
              disabled={isLoading}
            >
              Generate your summary &rarr;
          </button>
        </form>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <output className="space-y-10 my-10">
          {completion && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={summaryRef}
                >
                  Your generated summary
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                <div
                  className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                  onClick={() => {
                    navigator.clipboard.writeText(completion);
                    toast('Summary copied to clipboard', {
                      icon: '✂️',
                    });
                  }}
                  key={completion}
                >
                  <p>{completion}</p>
                </div>
              </div>
            </>
          )}
        </output>
      </main>
      <Footer />
    </div>
  );
}
