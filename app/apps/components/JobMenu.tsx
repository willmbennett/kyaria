'use client';

import { AppMenuItem } from "./AppMenuItem";
import { Button } from "../../components/Button";

export default function JobMenu(
  { appId,
    boardId,
    filteredPages,
    activeProgressSection
  }: {
    appId: string;
    boardId?: string;
    filteredPages: {
      label: string;
      section: string;
    }[];
    activeProgressSection: string;
  }) {

  return (
    <div className="bg-white flex flex-col w-64">
      <Button size='sm' variant='ghost' href={`/board${boardId ? `/${boardId}` : '/default'}`} className="mb-3">← Back to Board</Button>
      {filteredPages.map((l, i) => {
        return (
          <div key={i}>
            <AppMenuItem section={l.section} label={l.label} activeProgressSection={activeProgressSection} appId={appId} />
          </div>
        );
      })}
    </div>
  );
}
