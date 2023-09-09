'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function JobMenu({ jobName }: {jobName: string}) {
  const pathname = usePathname()

  const links = [
    { label: "Job Description", path: `/jobs/${jobName}`},
    { label: "Resume", path: `/jobs/${jobName}/resume`},
    { label: "Story", path: `/jobs/${jobName}/story`},
  ];

  return (
    <div className="bg-white sticky top-40 z-50 bg-white p-4 rounded-lg">
      {links.map((l, i) => {
        return (
          <Link key={i} href={l.path}>
            <div
              className={`px-4 py-2 text-sm text-gray-600 ${
                pathname === l.path
                  ? "bg-gray-100"
                  : "hover:bg-gray-100"
              }`}
            >
              {l.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
