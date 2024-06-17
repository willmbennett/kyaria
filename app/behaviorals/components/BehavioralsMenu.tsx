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
        <div className="bg-white flex justify-between h-10">
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
                            cn("flex-grow flex h-full justify-center items-center px-2 font-bold text-slate-700",
                                i == activeIndex && 'bg-slate-100 border-b-2 border-blue-600 cursor-default',
                                i < activeIndex && 'bg-slate-100 border-b-2 border-blue-600 hover:bg-background',
                                i > activeIndex && "bg-white hover:bg-slate-100 hover:border-b-2 hover:border-blue-600"
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
