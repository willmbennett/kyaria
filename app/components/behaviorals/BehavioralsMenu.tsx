'use client';
import { Button } from "../Button";
import { Sections } from "../../behaviorals/helper";
const ACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-1 my-1 rounded text-xl lg:text-lg text-gray-600 bg-gray-200 font-bold items-center justify-center hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-1 my-1 rounded text-xl lg:text-lg text-gray-600 font-bold items-center justify-center hover:bg-gray-600 hover:text-white";


interface BehavioralMenuProps {
    sections: Sections[];
    currentSection: string
    setCurrentSection: (section: Sections) => void
}

export default function BehavioralsMenu({
    sections,
    currentSection,
    setCurrentSection
}: BehavioralMenuProps
) {

    return (
        <div className="bg-white my-2 flex flex-col w-64">
            <Button size='sm' variant='ghost' href="/behaviorals" className="mb-3">← Back</Button>
            {sections.map((l, i) => {
                const handleClick = () => {
                    setCurrentSection(l)
                };
                return (
                    <div key={i}>
                        <div className={l === currentSection ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                            <button
                                onClick={handleClick}
                                className="inline"
                            >
                                {l}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
