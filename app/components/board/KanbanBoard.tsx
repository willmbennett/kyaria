// KanbanBoard.js
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, SensorDescriptor, SensorOptions } from '@dnd-kit/core';
import { boardItemType, jobStates } from '../../board/job-helper';
import KanbanColumn from './KanbanColumn';
import AppItem from './boarditem/AppItem';
import { SideBarItem } from '../../helper';
import { BoardClass } from '../../../models/Board';

interface KanbanBoardProps {
    sensors: SensorDescriptor<SensorOptions>[];
    handleDragEnd: (event: DragEndEvent) => Promise<void>;
    handleDragStart: (event: DragStartEvent) => void;
    handleDragOver: (event: DragOverEvent) => Promise<void>;
    id: string;
    apps: boardItemType[];
    boardId?: string;
    activeId?: string; // Assuming activeId could be optional
    updateAppState: (appId: string, newState: { [key: string]: any }) => void;
    boards: BoardClass[];
    removeApp: (id: string) => Promise<void>;
}

export const KanbanBoard = ({
    sensors,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    id,
    apps,
    boardId,
    updateAppState,
    boards,
    activeId,
    removeApp
}: KanbanBoardProps) => (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver} id={id}>
        <div id='kanban-container' className='relative overflow-x-scroll overflow-y-hidden w-full h-full'>
            <div className='flex h-full md:px-2 lg:px-4'>
                {jobStates.map((state, index) =>
                    <KanbanColumn
                        key={index}
                        index={index}
                        state={state}
                        apps={apps.filter(app => app.boardId == boardId)}
                        updateAppState={updateAppState}
                        boards={boards}
                        removeApp={removeApp}
                    />
                )}
            </div>
        </div>
        <DragOverlay>
            {activeId && apps.find(job => job.id === activeId) ? (
                <AppItem
                    app={apps.find(job => job.id === activeId) as boardItemType}
                    updateAppState={updateAppState}
                    state={apps.find(job => job.id === activeId)?.state || 'WISHLIST'}
                    boards={boards}
                    removeApp={removeApp}
                />
            ) : null}
        </DragOverlay>
    </DndContext>
);
