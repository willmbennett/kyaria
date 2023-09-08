'use client'
import Link from "next/link"

export default function Page() {

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center py-2 min-h-screen">
      <Link href="jobs/job">Demo Job</Link>
    </div>
  );
}
