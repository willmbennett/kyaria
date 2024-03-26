'use client'
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '../Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface FormValues {
    textAreaValue: string;
}

interface AutoResizeTextareaProps {
    value: string;
    onUpdate: (newValue: string) => Promise<void>;
    titleStyle: string
}


export const SingleEdit = ({ value, onUpdate, titleStyle }: AutoResizeTextareaProps) => {
    const [edit, setEdit] = useState(false);
    const [currentValue, setCurrentValue] = useState(value)
    const router = useRouter()

    const toggleEdit = () => {
        setEdit(!edit)
    }

    const { register, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: { textAreaValue: value }
    });

    const onSubmit = async (data: FormValues) => {
        if (data.textAreaValue != currentValue) {
            await onUpdate(data.textAreaValue);
            setCurrentValue(data.textAreaValue)
            router.refresh()
        }
        toggleEdit()
    };

    if (!edit) return (
        <div className='flex gap-2 items-center'>
            <span className={titleStyle}>{currentValue}</span>
            <Button
                type="button"
                className="border-none text-slate-300"
                size="sm"
                variant='ghost'
                onClick={toggleEdit}
            >
                Edit
            </Button>
        </div>
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
            <TextareaAutosize
                {...register('textAreaValue')}
                placeholder="Type something..."
                style={{ width: '100%' }}
            />
            <Button
                type="submit"
                size="sm">
                Save
            </Button>
            <Button
                type="button"
                className="border-none"
                size="sm"
                variant='ghost'
                onClick={toggleEdit}
            >
                Cancel
            </Button>
        </form>

    );
};
