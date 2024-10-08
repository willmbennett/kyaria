import { boardItemType } from "../../board/job-helper";
import AppItem from "./boarditem/AppItem";
import { BoardClass } from "../../../models/Board";

interface KanbanItemListProps {
    apps: boardItemType[];
    updateAppState: (appId: string, newState: { [key: string]: any }) => void
    state: string;
    boards: BoardClass[]
    removeApp: (id: string) => Promise<void>;
}

export const KanbanItemList = ({ apps, state, boards, updateAppState, removeApp }: KanbanItemListProps) => (
    <div className='flex flex-col gap-2 w-full'>
        {apps.map(app => (
            <AppItem
                key={app.id}
                app={app}
                updateAppState={updateAppState}
                state={state}
                boards={boards}
                removeApp={removeApp}
            />
        ))}
    </div>
);
