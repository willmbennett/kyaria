import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button
          onClick={() => signOut()}
          className="bg-black rounded-xl text-white font-medium mx-2 px-3 py-2 px-4 py-2 hover:bg-black/80"
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
        className="bg-black rounded-xl text-white font-medium mx-2 px-4 py-2 hover:bg-black/80"
      >
        Sign in
      </button>
    </>
  );
}