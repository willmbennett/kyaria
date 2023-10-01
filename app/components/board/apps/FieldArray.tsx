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
                <div key={field.id} className="ext-left font-bold text-2xl mb-4 className='dark:text-neutral-200'">
                    <div className={BASIC_FIELD_STYLE}>
                        <input {...register(`${name}.${index}`)} placeholder={""} className='dark:text-black'/>
                    </div>
                </div>
            ))}
            <div className={BASIC_FIELD_STYLE}>
                <button
                    className="inline-block rounded px-6 pb-2 pt-2.5 text-xs hover:opacity-80 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    style={{ backgroundColor: '#00703C' }}
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    type="button"
                    onClick={() => appendChildItem({})}
                >
                    Add New
                </button>
            </div>
        </>
    );
};