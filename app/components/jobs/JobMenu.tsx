'use client';

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { usePathname } from 'next/navigation'

export default function JobMenu() {
  const pathname = usePathname()

  const links = [
    { label: "Job Description", path: "/jobs/job"},
    { label: "Resume", path: "/jobs/job/resume"},
    { label: "Story", path: "/jobs/job/story"},
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
