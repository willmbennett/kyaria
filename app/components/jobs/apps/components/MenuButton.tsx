'use client';

const ACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-2 rounded text-xl lg:text-lg text-gray-600 bg-gray-200 font-bold items-center justify-center hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-2 rounded text-xl lg:text-lg text-gray-600 font-bold items-center justify-center hover:bg-gray-600 hover:text-white";


export default function JobMenuButton(
    {
        label,
        section,
        currentSection,
        setSection,
        active,
        setActive
    }: {
        label: string,
        section: string,
        currentSection: string
        setSection: any,
        active: boolean,
        setActive: any
    }) {

    const handleClick = () => {
        setActive(!active);
        setSection(section)
    };

    return (
        <>
            <div className={section === currentSection? ACTIVE_ROUTE: INACTIVE_ROUTE}>
                <button
                    onClick={handleClick}
                    className="inline"
                >
                    {label}
                </button>
            </div>
        </>
    );
}
