import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
    const { data: session } = useSession();
  
    if (session) {
      return (
        <>
          <span className="text-slate-500 items-center justify-center px-3 py-2 ">{session?.user?.name}</span>
          <button
            onClick={() => signOut()}
            className="bg-black rounded-xl text-white font-medium px-3 py-2 px-4 py-2 hover:bg-black/80"
          >
            Sign out
          </button>
        </>
      );
    }
    return (
      <>
        <button
          onClick={() => signIn()}
          className="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80"
        >
          Sign in
        </button>
      </>
    );
  }