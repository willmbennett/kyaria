import React, { KeyboardEventHandler, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import CreatableSelect from 'react-select/creatable';
import { updateProfileAction } from '../../profile/_action';
import { Button } from '../Button';

const ListItem = ({
    skills,
    profileId,
    setKey,
    userCanEdit,
}: {
    skills: string[];
    profileId: string;
    setKey: string;
    userCanEdit: boolean;
}) => {
    const router = useRouter()
    const path = usePathname()
    const [selectedSkills, setSelectedSkills] = useState(
        skills.map((skill) => ({ label: skill, value: skill }))
    );
    const [inputValue, setInputValue] = useState('');
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                // Check if the skill is unique before adding it
                if (!selectedSkills.some((skill) => skill.value === inputValue)) {
                    const newSkill = { label: inputValue, value: inputValue };
                    setSelectedSkills((prevSelectedSkills) => [
                        ...prevSelectedSkills,
                        newSkill,
                    ]);
                }
                setInputValue(''); // Clear the input value here
                event.preventDefault();
        }
    };


    const saveSkills = async () => {
        if (userCanEdit) {
            const editedSkills = selectedSkills.map((skill) => skill.value);
            const data = {
                [setKey]: editedSkills,
            };
            //console.log(data)
            // Perform the update action here
            await updateProfileAction(profileId, data, "/");
            toggleEditMode();
            router.push(path, { scroll: false });
        }
    };

    return (
        <div className="mb-8">
            {!editMode ? (
                <div className='flex flex-row items-center text-left w-full'>
                    <p className="text-left pb-2">{skills.join(', ')}</p>
                    {userCanEdit && (
                        <Button
                            type="button"
                            className="py-1 px-3 border-none"
                            size="md"
                            variant="ghost"
                            onClick={toggleEditMode}
                        >
                            Edit
                        </Button>
                    )}
                </div>
            ) : (
                <div className='flex flex-row items-center text-left w-full'>
                    <CreatableSelect
                        isMulti
                        isClearable
                        inputValue={inputValue}
                        value={selectedSkills}
                        menuIsOpen={false}
                        onChange={(newValue) => setSelectedSkills(newValue as any[])} // Cast to any[] to resolve the error
                        onInputChange={(newValue) => setInputValue(newValue)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type something and press enter..."
                        classNames={{
                            control: (state) =>
                                `border rounded-md p-2 m-2 ${state.isFocused ? 'border-red-600' : 'border-gray-300'
                                }`,
                        }}
                    />
                    <Button
                        type="button"
                        className="py-1 px-3 border-none"
                        size="md"
                        variant="solid"
                        onClick={saveSkills}
                    >
                        Save
                    </Button>
                    <Button
                        type="button"
                        className="py-1 px-3 ml-2 border-none"
                        size="md"
                        variant="ghost"
                        onClick={toggleEditMode}
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ListItem;
