"use client"
import React from "react";
import { useFieldArray } from "react-hook-form";

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

export default (
    {
        control,
        register,
        parentIndex,
        parentName,
        childName,
    }: {
        control: any,
        register: any,
        parentIndex: number,
        parentName: string,
        childName: string,
    }) => {

    const { fields: childItem, append: appendChildItem } = useFieldArray({
        control,
        name: `${parentName}.${parentIndex}.${childName}`,
    });

    return (
        <div className="mb-8">
            {childItem.map((field, index) => (
                <div key={field.id} className="text-left font-medium text-lg mb-4 flex flex-col w-full">
                    <p>{index + 1}. Accomplishment</p>
                    <div className={BASIC_FIELD_STYLE}>
                        <input {...register(`${parentName}.${parentIndex}.${childName}.${index}.content`)} placeholder={`${childName} ${index + 1}`} />
                    </div>
                    <p>{index + 1}. Details</p>
                    <div className={BASIC_FIELD_STYLE}>
                        <textarea {...register(`${parentName}.${parentIndex}.${childName}.${index}.detail`)} rows={5} cols={50} placeholder="Details" />
                    </div>
                </div>
            ))}
            <div className={BASIC_FIELD_STYLE}>
                <button
                    className="inline-block bg-dartmouth-green rounded px-6 pb-2 pt-2.5 text-xs hover:opacity-80 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    type="button"
                    onClick={() => appendChildItem({})}>
                    Add {childName == 'responsibilities' ? 'Responsibility' : 'New'}
                </button>
            </div>
        </div>
    );
};