import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useCopyResume } from '../../../../lib/hooks/resume-test';
import { ResumeClass } from "../../../../models/Resume";
import { resumeTemplates } from "../../../resumebuilder/resume-templates";
import { Button } from "../../Button";
import CustomPDFViewer from "../pdfviewer/CustomPDFViewer";


const dropDownMenu = (options: string[], currentIndex: number, setCurrentIndex: (index: number) => void) => (
    <Menu as="div" className="relative">
        {({ open }) => (
            <>
                <Menu.Button
                    className={`group flex items-center px-4 bg-slate-100 py-2  font-medium outline-none duration-150 ease-in-out focus:outline-none ${open
                        ? 'bg-gray-secondary-50 text-slate-900'
                        : 'text-slate-700 hover:bg-slate-100  hover:text-slate-900'
                        }`}
                >
                    <span>{options[currentIndex]}</span>
                    <ChevronDownIcon
                        className={`ml-2 h-5 w-5 duration-300 ${open
                            ? 'rotate-180 text-slate-900'
                            : 'text-slate-600/90 group-hover:text-slate-900'
                            }`}
                        aria-hidden="true"
                    />
                </Menu.Button>


                <Menu.Items className="absolute right-0 z-20 mt-3 w-auto space-y-1 bg-gray-secondary-50 p-2.5 outline-none drop-shadow filter focus:outline-none">
                    {options.map((option: string, i) => (
                        <Menu.Item key={`${option}-dropdown-desktop`}>
                            <button
                                onClick={() => (setCurrentIndex(i))}
                                className={`block px-5 py-3.5 font-medium ${currentIndex == i
                                    ? 'bg-gray-secondary-100/60 text-slate-900'
                                    : 'text-slate-700 transition duration-300 ease-in-out hover:bg-gray-secondary-100/60 hover:text-slate-900'
                                    }`}
                            >
                                {option}
                            </button>
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </>
        )}
    </Menu>
)

export default function ResumeTemplates({ userId }: { userId: string }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const selectedTemplate = resumeTemplates[currentIndex];
    const options = resumeTemplates.map(t => t.templateName)

    return (
        <div className="flex flex-col 2-full justify-center items-center">
            <div className="max-w-[62vh] py-2 flex flex-row w-full items-center text-center justify-between">
                <h1 className="text-center sm:text-3xl text-2xl font-bold text-slate-900">
                    Resume Templates
                </h1>
                {dropDownMenu(options, currentIndex, setCurrentIndex)}
            </div>
            <div className="w-full flex justify-center items-center w-[62vh]">
                <CustomPDFViewer
                    data={selectedTemplate.template}
                    userId={userId}
                    useSave={true}
                />
            </div>
        </div>
    );
}