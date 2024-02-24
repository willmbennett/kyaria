import { usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import { Button } from "../Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateJobAction } from "../../jobs/_action";
import { EditJobDescription } from "./EditJobDescription";

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

export type FormFields = {
    input: string
};


export const EditList = (
    {
        listItems = [],
        id,
        userCanEdit,
        parentName
    }: {
        listItems: string[],
        id: string,
        userCanEdit: boolean,
        parentName: string
    }) => {
    const [add, setAdd] = useState(false)
    const router = useRouter()
    const path = usePathname()

    const toggleAdd = () => {
        setAdd(!add)
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormFields>({});

    const parseNewLines = (inputString: string) => {
        return inputString
            .split('\n')
            .map((line: string) => line.trim()) // trim each line
            .filter((line: string) => line !== ''); // remove empty lines
    };

    // Save the final message to the database
    const onSubmit: SubmitHandler<FormFields> = async (formData) => {
        if (userCanEdit) {
            // Save the message to the database
            const newItems = parseNewLines(formData.input);
            const newArray = [
                ...listItems,
                ...newItems
            ];

            // Create a payload for the update
            const data = { [parentName]: newArray };
            //console.log(id, data)
            const update = await updateJobAction(id, data, "/")
            router.push(path, { scroll: false })
            setAdd(false)

            // After the update, reset the form fields
            reset({ input: '' }); // This will clear the 'input' field
        }
    };

    const newExperienceId = listItems.length

    return (

        <>
            <div className='flex flex-col gap-2'>
                {listItems.length > 0 && listItems.map((item: any, index: number) => (
                    <div key={index} className='flex flex-row items-start gap-2'>
                        <span>•</span>
                        <EditJobDescription
                            jobId={id}
                            setKey={`${parentName}.${index}`}
                            currentState={item}
                            userCanEdit={userCanEdit}
                            deleatable={true}
                            array={listItems}
                            parentName={parentName}
                            index={index}
                        />
                    </div>
                ))}
            </div>
            {add && userCanEdit && (<>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div key={newExperienceId} className="ext-left font-bold text-2xl mb-4">
                        <div className={BASIC_FIELD_STYLE}>
                            <textarea {...register(`input`)} placeholder="Past bullets (newline separated works)" />
                        </div>
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <Button
                            variant="solid"
                            size="md"
                            type="submit"
                        >
                            Add
                        </Button>
                    </div>
                </form>
            </>)}
            {userCanEdit && (
                <div className={BASIC_FIELD_STYLE}>
                    <Button
                        variant={add ? "ghost" : "solid"}
                        size="md"
                        type="button"
                        onClick={toggleAdd}
                        className=""
                    >
                        {add ? "Cancel" : "Add New"}
                    </Button>
                </div>
            )}
        </>
    );
}
