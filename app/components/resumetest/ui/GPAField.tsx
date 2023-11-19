import React from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = {
    name: string;
    control: Control<any>;
};

const GPAField = ({ name, control }: Props) => (
    <div>
        <label>GPA Score</label>
        <Controller
            name={`${name}.score`}
            control={control}
            render={({ field }) => <input type="text" {...field} placeholder="GPA Score" />}
        />

        <label>Scoring System</label>
        <Controller
            name={`${name}.scoringSystem`}
            control={control}
            render={({ field }) => <input type="text" {...field} placeholder="Scoring System" />}
        />
    </div>
);

export default GPAField;
