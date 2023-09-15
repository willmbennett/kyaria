'use client'
import AccessDenied from "../components/auth/AccessDenied";

export default function Page() {

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center py-2 min-h-screen bg-gray-100">
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <AccessDenied />
      </main>
    </div>
  );
}
