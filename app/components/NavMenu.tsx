"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";
const INACTIVE_ROUTE =
"py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <span className="text-slate-500">{session?.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="ml-4 bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80"
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <span className="text-slate-500">Not signed in</span>
      <button
        onClick={() => signIn()}
        className="ml-4 bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80"
      >
        Sign in
      </button>
    </>
  );
}

export default function NavMenu() {
  const pathname = usePathname();
  return (
    <div className="bg-white shadow-md flex justify-between items-center p-4 rounded-xl">
      <div className="flex space-x-4">
        <Link href="/">
          <span
            className={
              pathname === "/"
                ? "rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-600 shadow-md"
                : "rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-600 shadow-md hover:bg-gray-100"
            }
          >
            Home
          </span>
        </Link>
        <Link href="/jobs">
          <span
            className={
              pathname === "/jobs"
                ? "rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-600 shadow-md"
                : "rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-600 shadow-md hover:bg-gray-100"
            }
          >
            Jobs
          </span>
        </Link>
      </div>
      <div className="space-x-4">
        <span className="text-slate-500">Career Launcher</span>
      </div>
      <div className="space-x-4">
      <AuthButton />
      </div>
    </div>
  );
}
  