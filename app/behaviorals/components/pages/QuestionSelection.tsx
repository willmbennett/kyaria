'use client'

import { Menu } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../../../components/Button';

interface DropdownInputProps {
    options: string[];
    selected?: string
    handleUpdatQuestion: (input: string) => void;
    toggleCancel: () => void;
}

export function DropdownInput({ options, selected, handleUpdatQuestion, toggleCancel }: DropdownInputProps) {
    const router = useRouter()
    const [selectedOption, setSelectedOption] = useState(selected || '');
    const [inputValue, setInputValue] = useState('');
    const [isCustom, setIsCustom] = useState(false);

    const handleSelectChange = (option: string) => {
        if (option === 'custom') {
            setIsCustom(true);
            setSelectedOption('');
        } else {
            setIsCustom(false);
            setSelectedOption(option);
            setInputValue('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setSelectedOption('');
    };

    const handleSubmit = async () => {
        const value = isCustom ? inputValue : selectedOption;
        if (value) {
            handleUpdatQuestion(value)
            router.refresh()
            // Handle successful submission (e.g., show a success message, reset the form, etc.)
        } else {
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <Menu as="div" className="relative w-3xl">
                {({ open }) => (
                    <>
                        <Menu.Button className="group relative z-30 flex w-full cursor-pointer items-center justify-between border text-slate-800 hover:bg-slate-700 hover:text-white px-4 py-2 transition duration-300 ease-in-out focus:outline-none">
                            <p className="font-medium">{selectedOption || 'Select an option'}</p>
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 top-full z-50 w-full bg-white border shadow-xl max-h-96 overflow-y-scroll">
                            {options.map((option, index) => (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <button
                                            className={`${active ? 'bg-slate-700 text-white' : 'text-slate-800'
                                                } group flex w-full text-left items-center px-4 py-2 text-sm`}
                                            onClick={() => handleSelectChange(option)}
                                        >
                                            {option}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-slate-700 text-white' : 'text-slate-800'
                                            } group flex w-full items-center px-4 py-2 text-sm`}
                                        onClick={() => handleSelectChange('custom')}
                                    >
                                        Custom
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </>
                )}
            </Menu>
            {isCustom && (
                <input
                    type="text"
                    className="p-2 border rounded-md text-slate-700"
                    placeholder="Enter your own value"
                    value={inputValue}
                    onChange={handleInputChange}
                />
            )}
            <div className='flex w-full'>
                <Button
                    onClick={handleSubmit}
                    className='w-2/3'
                >
                    Select
                </Button>
                <Button type='button' size='sm' variant='ghost' className='border-none w-1/3 hover:bg-slate-200 hover:text-slate-600' onClick={toggleCancel}>Cancel</Button>
            </div>
        </div>
    );
}
