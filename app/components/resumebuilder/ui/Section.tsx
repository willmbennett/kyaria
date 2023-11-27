import React, { useState, ReactNode } from 'react';

interface SectionProps {
  title: string; // Add this line to include a title in the props
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div className='w-full'>
      <button
        type='button'
        className='inline-flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 my-2'
        onClick={() => setShowComponent(!showComponent)}
        aria-expanded={showComponent}
      >
        {title}
        <svg className={`-mr-1 h-5 w-5 text-gray-400 transition-transform duration-200 ${showComponent ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      <div className={`transition-all ease-in-out duration-300 ${showComponent ? '' : 'max-h-0 overflow-hidden'}`}>
        {showComponent && children}
      </div>
    </div>

  );
};

export default Section;
