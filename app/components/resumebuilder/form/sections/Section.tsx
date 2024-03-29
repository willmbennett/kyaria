import React, { useState, ReactNode } from 'react';
import { Button } from '../../../Button';

interface SectionProps {
  title: string; // Add this line to include a title in the props
  children?: ReactNode;
  isDragging?: boolean
}

const Section: React.FC<SectionProps> = ({ title, children, isDragging = false }) => {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div className={`rounded-xl w-full ${isDragging && 'shadow-lg border active:border bg-white dark:bg-slate-800'}`}>
      <div className='flex p-3 rounded-xl justify-between items-center'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={() => setShowComponent(!showComponent)}
        >
          {showComponent ? 'Hide' : 'Edit'}
        </Button>
      </div>
      {showComponent && !isDragging &&
        <div className={`mb-6 p-4 transition-all ease-in-out duration-300 ${showComponent ? '' : 'max-h-0 overflow-hidden'}`}>
          {children}
        </div>
      }
    </div>
  );
};

export default Section;
