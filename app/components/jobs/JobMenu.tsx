'use client';

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function JobMenu() {
  const activeSegment = useSelectedLayoutSegment();

  const links = [
    { label: "Job Description", path: "/jobs/job", targetSegment: null },
    { label: "Resume", path: "/jobs/job/resume", targetSegment: "resume" },
    { label: "Story", path: "/jobs/job/story", targetSegment: "story" },
  ];

  return (
    <div className="bg-white">
      {links.map((l, i) => {
        return (
          <Link key={i} href={l.path}>
            <div
              className={`cursor-pointer block rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-600 shadow-md mb-2 ${
                activeSegment === l.targetSegment
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
