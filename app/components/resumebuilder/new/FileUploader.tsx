import React, { useState } from 'react';
import { DndContext, useDroppable } from '@dnd-kit/core';

interface FileUploaderProps {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement> | FileList) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileChange }) => {
    const { setNodeRef } = useDroppable({
        id: 'file-uploader-droppable',
    });
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragOver(false); // Reset drag over state

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            onFileChange(event.dataTransfer.files);
        }
    };

    // Conditional Tailwind CSS classes based on drag-over state
    const dropAreaClasses = `border-2 border-dashed ${isDragOver ? 'border-blue-500 bg-blue-100' : 'border-gray-300'} rounded-md p-10 text-center transition-colors duration-300 ease-in-out`;

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragOver(true); // Set drag over state
    };

    const handleDragLeave = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragOver(false); // Reset drag over state
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            onFileChange(event.target.files);
        }
    };

    return (
        <DndContext>
            <div
                ref={setNodeRef}
                className={dropAreaClasses}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDragEnter={handleDragOver} // Reuse handleDragOver for enter event
            >
                <p className="mb-4">Drag and drop your resume here, or click to select a file.</p>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleInputChange}
                    className="hidden"
                    id="file-uploader-input"
                />
                <label htmlFor="file-uploader-input" className="cursor-pointer text-blue-600 hover:text-blue-800 focus:text-blue-800 active:text-blue-800 transition-colors duration-200 ease-in-out">
                    Browse files
                </label>
            </div>
        </DndContext>
    );
};
