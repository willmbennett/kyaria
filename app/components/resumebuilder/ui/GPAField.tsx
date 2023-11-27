import React from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = {
    name: string;
    control: Control<any>;
};

const GPAField = ({ name, control }: Props) => (
    <div className='flex flex-row'>
        <div className='flex flex-col'>
            <label className="text-gray-600 text-sm mb-1">GPA Score</label>
            <Controller
                name={`${name}.score`}
                control={control}
                render={({ field }) => <input type="text" {...field} placeholder="GPA Score" />}
            />
        </div>
        <div className='flex flex-col'>
            <label className="text-gray-600 text-sm mb-1">Scoring System</label>
            <Controller
                name={`${name}.scoringSystem`}
                control={control}
                render={({ field }) => <input type="text" {...field} placeholder="Scoring System" />}
            />
        </div>
    </div>
);

export default GPAField;
