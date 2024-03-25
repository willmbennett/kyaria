'use client'
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '../Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AutoResizeTextareaProps {
    value: string;
    onUpdate: (newValue: string) => Promise<void>;
    titleStyle: string
}


export const SingleEdit = ({ value, onUpdate, titleStyle }: AutoResizeTextareaProps) => {
    const [edit, setEdit] = useState(false);
    const router = useRouter()

    const toggleEdit = () => {
        setEdit(!edit)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        await onUpdate(value);
        router.refresh()
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onUpdate(event.target.value);
    };

    if (!edit) return (
        <div className='fex gap-2 items-center'>
            <span className={titleStyle}>{value}</span>
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
        <form onSubmit={handleSubmit} className='flex gap-2'>
            <TextareaAutosize
                value={value}
                onChange={handleChange}
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
