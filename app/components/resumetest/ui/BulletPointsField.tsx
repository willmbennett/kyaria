import React from 'react';
import { useFieldArray, Controller, Control } from 'react-hook-form';

type Props = {
    name: string;
    control: Control<any>;
};

const BulletPointsField = ({ name, control }: Props) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name
    });

    return (
        <div className='w-full'>
            {fields.map((field, index) => (
                <div key={field.id} className="mb-2 flex flex-row">
                    <Controller
                        name={`${name}[${index}].text`} // Ensure this matches the data structure
                        control={control}
                        render={({ field }) => <input type="text" {...field} className="border p-1 rounded w-full" />}
                    />
                    <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
                </div>
            ))}
            <button type="button" onClick={() => append({ text: '' })} className="mt-2 text-blue-500">Add Bullet Point</button>
        </div>
    );
};

export default BulletPointsField;
