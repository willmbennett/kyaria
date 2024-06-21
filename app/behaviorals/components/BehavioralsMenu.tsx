'use client';
import { cn } from "../../../lib/utils";
import { Sections } from "../helper";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface BehavioralMenuProps {
    sections: Sections[];
    currentSection: Sections
    setCurrentSection: (section: Sections) => void
}

export default function BehavioralsMenu({
    sections,
    currentSection,
    setCurrentSection
}: BehavioralMenuProps
) {

    const activeIndex = sections.indexOf(currentSection)

    return (
        <div className="flex justify-between h-10">
            {sections.map((l, i) => {
                const handleClick = () => {
                    setCurrentSection(l)
                };
                return (
                    <button
                        key={i}
                        onClick={handleClick}
                        disabled={i == activeIndex}
                        className={
                            cn("flex-grow flex h-full justify-center items-center px-2 py-6 font-bold text-slate-700",
                                i == activeIndex && 'bg-vanilla border-b-2 border-purple-light cursor-default',
                                i < activeIndex && 'bg-vanilla border-b-2 border-purple-light hover:bg-background dark:hover:text-white',
                                i > activeIndex && "hover:bg-vanilla hover:border-b-2 hover:border-purple-light"
                            )}
                    >
                        <div className="flex-grow flex justify-center">
                            {`${i + 1}. ${l}`}
                        </div>
                        <ChevronRightIcon className="w-4" />
                    </button>
                );
            })}
        </div>
    );
}
