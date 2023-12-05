import { useState } from 'react';
import { ResumeClass } from '../../../../models/Resume';
import { ResumeScanDataClass } from '../../../../models/ResumeScan';
import { Button } from '../../Button';
import { Disclosure, Transition, Popover, Menu } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


interface ResumeListMenuProps {
    resumeScans: ResumeScanDataClass[];
    setResumeTest: (resume: ResumeScanDataClass) => void;
    resumeTest?: ResumeScanDataClass | null;
    setFormHidden: (arg: boolean) => void;
    resumes: ResumeClass[];
    currentResume?: ResumeClass | null;
    setUseResume: (arg: boolean) => void;
    useResume: boolean;
    setResume: (resume: ResumeClass) => void;
    editResume: boolean;
    toggleEdit: () => void;
    resetForm: () => void;
    userId?: string;
}


interface Action {
    label: string;
    onClick: () => void;
}

const DropdownMenu = ({ actions }: { actions: Action[] }) => (
    <Menu as="div" className="relative inline-block text-left h-full">
        {({ open }) => (
            <div className='w-full h-full'>
                <Menu.Button className={`group flex items-center font-medium outline-none duration-150 ease-in-out focus:outline-none w-10`}>
                    <ChevronDownIcon className={`ml-2 h-5 w-5 duration-300 ${open ? 'rotate-180 text-slate-900' : 'text-slate-600/90 group-hover:text-slate-900'}`} aria-hidden="true" />
                </Menu.Button>

                <Menu.Items className="absolute right-0 z-20 mt-3 min-w-30 space-y-1 bg-gray-secondary-50 p-1 outline-none drop-shadow filter focus:outline-none">
                    {actions.map((action, i) => (
                        <Menu.Item key={i}>
                            <button className="block px-5 py-2 font-medium text-slate-700 transition duration-300 ease-in-out hover:bg-gray-secondary-100/60 hover:text-slate-900 w-full text-left" onClick={action.onClick}>
                                {action.label}
                            </button>
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </div>
        )}
    </Menu>
);

type Item = ResumeClass | ResumeScanDataClass;

interface ListItemProps {
    isSelected: boolean;
    onClick: () => void;
    onEdit: () => void;
    children: React.ReactNode;
}

const isResume = (item: Item): item is ResumeClass => {
    return (item as ResumeClass)._id !== undefined;
};

const ListItem = ({ isSelected, onClick, onEdit, children }: ListItemProps) => {
    const actions = [
        { label: 'Edit', onClick: onEdit },
    ];

    return (
        <li className={`flex flex-row items-center justify-center p-1 h-auto space-y-1 ${isSelected ? 'border border-slate-600 shadow bg-slate-500 text-white' : 'bg-slate-200'}`}>
            <div onClick={isSelected ? onEdit : onClick} className="px-2 py-1.5 w-full rounded text-sm cursor-pointer">
                {children}
            </div>
            <DropdownMenu actions={actions} />
        </li>
    );
};



const ResumeListMenu: React.FC<ResumeListMenuProps> = ({
    resumeScans, setResumeTest, resumeTest, setFormHidden, resumes,
    currentResume, setUseResume, useResume, setResume, editResume, toggleEdit, resetForm, userId
}) => {

    // Combined function to handle click events for both resume scans and resumes
    const handleItemClick = (item: Item, itemIsResume: boolean, edit?: boolean | false) => {
        //console.log('Made it to click')
        if (itemIsResume) {
            //console.log('Resume Item: ', item)
            setResume(item as ResumeClass);
            setUseResume(true);
        } else {
            //console.log('Resume Scan Item: ', item)
            setResumeTest(item as ResumeScanDataClass);
            setUseResume(false);
        }
        if (edit) {
            toggleEdit()
        }
    };

    // Combined render function
    const renderItem = (item: Item, index: number, itemIsResume: boolean) => {
        const isSelected = useResume
            ? item._id === currentResume?._id
            : item._id === resumeTest?._id;

        const formattedLabel = isResume(item) && itemIsResume
            ? `Resume ${item.createdAt ? new Date(item.createdAt).toLocaleDateString() : resumes.length - index} - ${item.title ? item.title : item.name}`
            : `Resume ${resumeScans.length - index} - ${new Date((item as ResumeScanDataClass).createdAt).toLocaleDateString()}`;

        return (
            <ListItem
                key={index}
                isSelected={isSelected}
                onClick={() => handleItemClick(item, itemIsResume)}
                onEdit={() => handleItemClick(item, itemIsResume, true)}
            >
                <p>{formattedLabel}</p>
            </ListItem>
        );
    }

    return (
        <div className="sticky top-60 flex flex-col p-2 w-full h-1/2 space-y-1">
            <div className='flex flex-row justify-between w-full'>
                <p className="text-lg font-semibold">Resumes</p>
                {userId &&
                    <Button onClick={resetForm} size='sm'>
                        New Resume
                    </Button>
                }
            </div>
            <p className="p-1 pb-3 text-sm">Click once to select, click twice or use the menu to edit.</p>
            <div className='h-full w-full overflow-y-scroll bg-white border border-slate-100'>
                <ul className="w-full space-y-1">
                    {resumes.map((resume, index) => renderItem(resume, index, true))}
                </ul>
                <p className="text-lg font-semibold sticky top-0 py-2">Resumes Scans (Legacy)</p>
                <ul className="w-full space-y-1">
                    {resumeScans.map((resumeScan, index) => renderItem(resumeScan, index, false))}
                </ul>
            </div>
        </div>
    );
};

export default ResumeListMenu;
