'use client'
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ListInputProps = {
    id: string;
    sortable?: boolean;
    children: JSX.Element;
};

export const SortableFormSection = ({ id, sortable = true, children }: ListInputProps) => {
    const [showComponent, setShowComponent] = useState(false);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            style={style}
            className={`rounded-xl px-3 w-full hover:shadow-lg hover:bg-purple-dark transition-all duration-200 ease-in-out ${isDragging ? 'shadow-lg bg-purple-dark' : ''}`}
        >
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                className={`flex py-3 rounded-xl justify-between items-center ${sortable ? "cursor-grab" : ''}`}
            >
                <h2 className="text-lg font-semibold">
                    {id.replace('_', ' ').toLocaleUpperCase()}
                </h2>
                <button
                    type="button"
                    className="text-sm font-medium text-slate-600 hover:text-gray-800 hover:text-slate-200 bg-transparent rounded-md p-2 transition-colors duration-150 ease-in-out"
                    onClick={() => setShowComponent(!showComponent)}
                >
                    {showComponent ? 'Hide' : 'Edit'}
                </button>
            </div>

            {showComponent && !isDragging && (
                <div className="pb-3 transition-all ease-in-out duration-300">
                    {children}
                </div>
            )}
        </div>

    );
}