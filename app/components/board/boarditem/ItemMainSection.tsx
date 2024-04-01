
import { Button } from '../../Button';
import { boardItemType } from '../../../board/job-helper';
import { format, parseISO } from 'date-fns';
import { useDraggable } from '@dnd-kit/core';
import { MouseEventHandler } from 'react';
import { OptionsMenu } from './OptionsMenu';
import { Details } from './Details';
import { ItemMenu } from './ItemMenu';

interface ItemMainSectionProps {
    app: boardItemType;
    handleMouseOver: () => void;
    showDetails: boolean;
    toggleDetails: () => void
    handleViewPacketClick: () => void
    handleClose: MouseEventHandler<HTMLButtonElement>
    removeApp: () => Promise<void>;

}

export const ItemMainSection = ({
    app,
    handleMouseOver,
    showDetails,
    toggleDetails,
    handleViewPacketClick,
    handleClose,
    removeApp
}: ItemMainSectionProps) => {
    let { id, createdAt, jobTitle, company, location, employmentType, salaryRange, active } = app
    const date = parseISO(createdAt?.toString() || '');

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id
    });

    const hasDetails = (location || employmentType || salaryRange) ? true : false

    return (
        <div
            ref={setNodeRef}
            onMouseOver={handleMouseOver}
            {...listeners}
            {...attributes}
            className={`cursor-grab flex flex-col gap-2 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
            <div className="flex justify-between items-center text-sm text-gray-600">
                <p>
                    <span className="text-sm sm:text-base">{company}</span>
                    {' - '}
                    <time dateTime={new Date(createdAt).toISOString()} className="text-xs sm:text-sm text-gray-500">
                        {format(date, 'PP')}
                    </time>
                </p>
                <ItemMenu onDelete={removeApp} />
            </div>

            <h5 className="text-base sm:text-lg md:text-xl font-semibold truncate leading-tight">
                {jobTitle}
            </h5>

            <OptionsMenu
                isActive={active}
                showDetails={showDetails}
                toggleDetails={toggleDetails}
                handleViewPacketClick={handleViewPacketClick}
                handleClose={handleClose}
                hasDetails={hasDetails}
            />

            {showDetails &&
                <Details location={location} employmentType={employmentType} salaryRange={salaryRange} />
            }
        </div>

    )
}