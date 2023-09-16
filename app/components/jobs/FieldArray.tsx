import React from "react";
import { useFieldArray } from "react-hook-form";

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

export default (
    { 
        control, 
        register,
        name,
    }: {
        control: any, 
        register: any,
        name: string,
    }) => {

    const { fields: childItem, append: appendChildItem } = useFieldArray({
        control,
        name: `${name}`,
    });

  return (
    <>
            {childItem.map((field, index) => (
                <div key={field.id} className="ext-left font-bold text-2xl mb-4">
                    <div className={BASIC_FIELD_STYLE}>
                        <input {...register(`${name}.${index}`)} placeholder={""} />
                    </div>
                </div>
            ))}
            <div className={BASIC_FIELD_STYLE}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="button" onClick={() => appendChildItem({})}>
                    Add New
                </button>
            </div>
        </>
  );
};