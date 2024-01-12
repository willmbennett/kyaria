import React from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = {
    name: string;
    control: Control<any>;
    defaultValues: { score: string, scoringSystem: string };
};

const GPAField = ({ name, control, defaultValues }: Props) => (
    <div className='flex flex-row space-x-2 w-full'>
        <div className='flex flex-col w-full'>
            <label className="text-gray-600 text-sm mb-1">GPA Score</label>
            <Controller
                name={`${name}.score`}
                control={control}
                defaultValue={defaultValues.score} // Set default value here
                render={({ field }) => <input type="text" {...field} placeholder="GPA Score"/>}
            />
        </div>
        <div className='flex flex-col w-full'>
            <label className="text-gray-600 text-sm mb-1">Scoring System</label>
            <Controller
                name={`${name}.scoringSystem`}
                control={control}
                defaultValue={defaultValues.scoringSystem} // Set default value here
                render={({ field }) => <input type="text" {...field} placeholder="Scoring System"/>}
            />
        </div>
    </div>
);

export default GPAField;
