'use client'

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { updateQuestionAction } from '../../behaviorals/_action';
import { Button } from '../Button';

type QuestionFormFields = {
    details: string;
};

interface DetailsProps {
    questionId: string;
    userId: string;
    situation: string;
    details?: string;
}

export const Details = ({
    questionId,
    situation,
    details
}: DetailsProps) => {
    const [editDetails, setEditDetails] = useState(!details);

    const toggleDetails = () => {
        setEditDetails(!editDetails);
    };

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<QuestionFormFields>({
        defaultValues: { details }
    });

    const onSubmit: SubmitHandler<QuestionFormFields> = async (data) => {
        await updateQuestionAction(questionId, data, "/");
        setEditDetails(false);
    };

    const defaultMessage = `To make the best story possible add details such as: 
- What the business impact of the project was.
- Who you worked with to deliver this project.
- What challenges you overcame.
- What tools/tech did you use.
- How you went above and beyond your role.
    `;

    if (!details || editDetails) {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="mb-3 w-full">
                    <label htmlFor="details" className="mb-2 block text-sm font-medium text-gray-700">
                        Add some details on your accomplishment to improve your story
                    </label>
                    <textarea
                        {...register("details", { required: true })}
                        id="details"
                        rows={10}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder={defaultMessage}
                    />
                    {errors.details && <p className="mt-1 text-xs text-red-600">Please specify your experience.</p>}
                </div>
                <div className='flex flex-row gap-4'>
                    <Button type="submit" size="md">Add Details</Button>
                    <Button type="button" size="md" variant="ghost" onClick={toggleDetails}>Cancel</Button>
                </div>
            </form>
        );
    }

    return (
        <div className='flex flex-col w-full'>
            <div className='flex gap-2 items-center'>
                <h2 className="text-lg font-semibold leading-tight text-slate-900">
                    Currently selected situation:
                </h2>
            </div>
            <p className='text-slate-500 text-sm'>{situation}</p>
            <div className='flex gap-2 items-center'>
                <h2 className="text-lg font-semibold leading-tight text-slate-900">
                    Details you added:
                </h2>
                <Button size='sm' variant='ghost' className='border-none' onClick={toggleDetails}>
                    Edit
                </Button>
            </div>
            <p className='text-slate-500 text-sm'>{details}</p>
        </div>
    );
};