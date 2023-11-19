import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

type SingleInputProps = {
    sectionName: string
    register: UseFormRegister<any>;
    initialValue?: string;
};

const SingleInput: React.FC<SingleInputProps> = ({ sectionName, register, initialValue }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {sectionName.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
            </label>
            <TextareaAutosize
                {...register(sectionName)}
                defaultValue={initialValue}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
    );
};

export default SingleInput;
