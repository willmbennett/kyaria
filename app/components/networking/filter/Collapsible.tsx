import React, { useState } from 'react';

const Collapsible = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col space-y-5 md:justify-center xl:justify-start">
            <button
                className="text-lg font-semibold leading-tight text-slate-900 flex flex-row space-x-2 items-center w-full"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{title}</span>
                <span className="text-xl">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && children}
        </div>
    );
};

export default Collapsible;
