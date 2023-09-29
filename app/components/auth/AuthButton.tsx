import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button
          onClick={() => signOut()}
          className="bg-black rounded-xl text-white text-xl lg:text-lg font-bold mx-2 px-3 py-2 px-4 py-2 hover:bg-black/80 dark:text-neutral-200 dark:bg-neutral-600 dark:hover:bg-neutral-200 dark:hover:text-neutral-600"
        >
          SIGN OUT
        </button>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => signIn()}
        className="bg-black rounded-xl text-white font-medium mx-2 px-4 py-2 hover:bg-black/80 dark:bg-neutral-600 dark:hover:bg-neutral-200 dark:hover:text-neutral-600"
      >
        Sign in
      </button>
    </>
  );
}