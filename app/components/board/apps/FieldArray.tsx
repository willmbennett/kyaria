import React from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "../../Button";

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
        name: name,
    });

    return (
        <>
            {childItem.map((field, index) => (
                <div key={field.id} className="ext-left font-bold text-2xl mb-4'">
                    <div className={BASIC_FIELD_STYLE}>
                        <input {...register(`${name}[${index}]`)} placeholder="" />
                    </div>
                </div>
            ))}
            <div className={BASIC_FIELD_STYLE}>
                <Button
                    variant="solid"
                    size="md"
                    type="button"
                    onClick={() => appendChildItem("")}
                    className="mt-3"
                >
                    Add New
                </Button>
            </div>
        </>
    );
};