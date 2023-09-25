'use client'
import { signIn, useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <div className='top-0 absolute w-full'>
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
    </div>
  );
}
