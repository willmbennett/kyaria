'use client'
import { boardItemType } from '../../board/job-helper';
import { BoardClass } from '../../../models/Board';
import { useKanban } from '../../../lib/kanban/use-kanban';
import { SearchInput } from './SearchInput';
import { KanbanBoard } from './KanbanBoard';

interface KanbanPageProps {
    boardItems: boardItemType[]
    boards: BoardClass[]
    boardId?: string
}

export default function KanbanPage(
    {
        boardItems,
        boards,
        boardId
    }: KanbanPageProps
) {

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
        updateAppState
    } = useKanban({ boardItems, boardId })

    return (
        <div className="w-full p-4">
            <div className="flex justify-end items-center w-full mb-4">
                <SearchInput searchValue={searchValue} handleChange={handleChange} />
            </div>
            <div className="flex w-full gap-4 border border-slate-100 p-4 rounded-xl">
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
                />
            </div>
        </div>
    );
}