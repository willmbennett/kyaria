import React, { ReactNode } from 'react';
import { Button } from '../../../Button';

interface SectionProps {
    index: number;
    title: string; // Add this line to include a title in the props
    children?: ReactNode;
    isDragging?: boolean
    handleRemove: () => void;
    isVisible: boolean;
    toggleVisibility: () => void;
}

export const SectionWrapper: React.FC<SectionProps> = ({ index, title, children, handleRemove, isVisible, toggleVisibility }) => {
    return (
        <div className="mb-6 py-4">
            < div className='w-full flex flex-col lg:flex-row items-center justify-between' >
                <h3 className='text-lg font-semibold'>
                    {title}
                </h3>

                <div className='flex flex-row space-x-2'>
                    <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={toggleVisibility}
                    >
                        {isVisible ? 'Hide' : 'Edit'}
                    </Button>
                    <Button type="button" onClick={handleRemove} size='md' variant='secondary'>Remove</Button>
                </div>
            </div>
            {isVisible && children}
        </div >
    );
};
