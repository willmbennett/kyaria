'use client'
import { ActionItemType, boardItemType } from '../../board/job-helper';
import { BoardClass } from '../../../models/Board';
import { useKanban } from '../../../lib/kanban/use-kanban';
import { SearchInput } from './SearchInput';
import { KanbanBoard } from './KanbanBoard';
import { SingleEdit } from '../forms/SingleEdit';
import { Button } from '../Button';
import { SidebarWrapper } from '../sidebar/SidebarWrapper';
import { SideBarItem } from '../../helper';

interface KanbanPageProps {
    boardItems: boardItemType[];
    boards: BoardClass[];
    boardId?: string;
    name: string,
    userId: string
    items?: SideBarItem[];
    newTitle: string
    createNew: () => Promise<any>;
    sideBarTitle: string;
    deleteItemAction: ActionItemType
}

export default function KanbanPage({
    userId,
    createNew,
    items,
    newTitle,
    sideBarTitle,
    deleteItemAction,
    boardItems,
    boards,
    boardId,
    name
}: KanbanPageProps) {

    const {
        activeId,
        boardApps,
        searchValue,
        id,
        handleDragEnd,
        handleDragOver,
        handleDragStart,
        sensors,
        handleChange,
        updateAppState,
        updateBoardTitle,
        removeApp
    } = useKanban({ boardItems, boardId })

    const centerElements = () => (
        <div className="flex gap-4 items-center justify-center">
            <SingleEdit
                value={name}
                onUpdate={updateBoardTitle}
                titleStyle="sm:text-lg text-xl font-bold text-slate-900"
                editable={boardId != 'default'}
            />
            <Button
                variant="solid"
                size="sm"
                type="button"
                href={`/apps/new${boardId != 'default' ? `?board=${boardId}` : ''}`}
            >
                Add a New Job Post
            </Button>
            <SearchInput searchValue={searchValue} handleChange={handleChange} />
        </div>
    )

    return (
        <SidebarWrapper
            userId={userId}
            sideBarTitle={sideBarTitle}
            items={items}
            createNew={createNew}
            newTitle={newTitle}
            deleteItemAction={deleteItemAction}
            centerElements={centerElements()}
        >
            <div className="relative w-full h-full overflow-hidden">
                <KanbanBoard
                    sensors={sensors}
                    handleDragEnd={handleDragEnd}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    id={id}
                    apps={boardApps}
                    boardId={boardId}
                    updateAppState={updateAppState}
                    boards={boards}
                    activeId={activeId}
                    removeApp={removeApp}
                />
            </div>
        </SidebarWrapper>
    );
}