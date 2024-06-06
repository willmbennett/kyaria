'use client'

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Message } from 'ai';
import { updateQuestionAction } from '../../behaviorals/_action';
import { Button } from '../Button';

type QuestionFormFields = {
    details: string
};

interface DetialsProps {
    questionId: string;
    userId: string,
    details?: string;
}

export const Details = ({
    questionId,
    details
}: DetialsProps) => {
    const [showOptions, setShowOptions] = useState(false);
    const [showDetails, setShowDetails] = useState(details == '' ? true : false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<QuestionFormFields>({
        defaultValues: { details }
    });

    const onSubmit: SubmitHandler<QuestionFormFields> = async (data: any) => {
        //console.log(profileId, savedData)
        await updateQuestionAction(questionId, data, "/")
        setShowDetails(false)
    };

    const defaultMessage = `To make the best story possible add details such as: 
- What the business impact of the project was.
- Who you worked with to deliver this project.
- What challenges you overcame.
- What tools/tech did you use.
- How you went above and beyond your role.
`

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="mb-3">
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
