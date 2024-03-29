import { Dispatch, KeyboardEventHandler, SetStateAction, useCallback, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form";
import { ListFieldType, saveResumeToDatabase, updateSkills } from "../../app/resumebuilder/[id]/resumebuilder-helper";
import { JobClass } from "../../models/Job";
import { OnChangeValue } from "react-select";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { ResumeClass } from "../../models/Resume";
import { usePathname } from "next/navigation";

const logging = false

interface UseResumeListProps {
    setKey: string;
    inputList: string[]
    job?: Partial<JobClass>
    resume: ResumeClass;
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>
}

export const useResumeList = ({ setKey, inputList, job, resume, setSaveStatus }: UseResumeListProps) => {
    const path = usePathname()
    const formList: ListFieldType[] = inputList.map(item => ({ id: item, label: item, value: item }))
    const resumeId = resume._id.toString()

    const methods = useForm({
        defaultValues: {
            formList
        }
    });

    const { control, setValue } = methods

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'formList'
    });
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSkillsSave = async (listToSave: string[]) => {
        await saveResumeToDatabase({
            resumeId,
            setKey,
            value: listToSave,
            path,
            setSaveStatus
        })
    }

    const onChange = (fields: OnChangeValue<ListFieldType, true>) => {
        remove();
        fields.forEach(item => append({ id: item.id, label: item.label, value: item.value }));
        const listToSave = fields.map(field => field.value)
        handleSkillsSave(listToSave)
    }

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                // Check if the skill is unique before adding it
                if (!fields.some((field) => (field as ListFieldType).value === inputValue)) {
                    const newSkill = { id: inputValue, label: inputValue, value: inputValue };
                    append(newSkill)
                    const listToSave = [...fields.map(field => field.value), inputValue]
                    if (logging) console.log('listToSave, ', listToSave)
                    handleSkillsSave(listToSave)
                }
                setInputValue(''); // Clear the input value here
                event.preventDefault();
        }
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { over, active } = event;
        if (over && active.id !== over.id) {
            // Find the indices and reorder the list temporarily
            const oldIndex = fields.findIndex(item => item.id === active.id);
            const newIndex = fields.findIndex(item => item.id === over.id);

            // Update the state with the new order
            return move(oldIndex, newIndex);
        }
    };

    const onSortEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!active || !over) return;

        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex(item => item.id === active.id);
            const newIndex = fields.findIndex(item => item.id === over.id);
            const listToSave = fields.map(field => field.value)
            handleSkillsSave(listToSave)
            return move(oldIndex, newIndex);
        }
        const listToSave = fields.map(field => field.value)
        handleSkillsSave(listToSave)
    };

    async function optimizeSkills() {
        setLoading(true)
        const { newSkills } = await updateSkills({ job, resume })
        setLoading(false)
        if (logging) console.log('optimizedData', newSkills)
        if (newSkills) {
            const newSkillList: ListFieldType[] = newSkills.map(item => ({ id: item, label: item, value: item }))
            setValue('formList', newSkillList)
        }
    }

    return { methods, onSortEnd, handleDragOver, fields, optimizeSkills, loading, onChange, inputValue, setInputValue, handleKeyDown }
}