'use client'
import { boardItemType } from '../../board/job-helper';
import { BoardClass } from '../../../models/Board';
import { useKanban } from '../../../lib/kanban/use-kanban';
import { SearchInput } from './SearchInput';
import { KanbanBoard } from './KanbanBoard';
import { SingleEdit } from '../forms/SingleEdit';
import { Button } from '../Button';

interface KanbanPageProps {
    boardItems: boardItemType[];
    boards: BoardClass[];
    boardId?: string;
    name: string
}

export default function KanbanPage(
    {
        boardItems,
        boards,
        boardId,
        name
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
        updateAppState,
        updateBoardTitle,
        removeApp
    } = useKanban({ boardItems, boardId })

    return (
        <div className="relative w-full sm:m-1 md:m-2 lg:m-3 xl:m-4">
            <div id="kanban-board-menu" className='absolute top-0 z-20 bg-white w-full'>
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
            </div>
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
    );
}