'use client'
import { useState } from 'react';
import { DropdownInput } from './QuestionSelection';
import { Button } from '../../../components/Button';
import { updateQuestionAction } from '../../_action';
import { usePathname } from 'next/navigation';
import { questionOptions } from '../../helper';

export const Question = ({
    questionId,
    question,
}: {
    questionId: string,
    question?: string
}) => {
    const path = usePathname()
    const [editQuestion, setEditQuestion] = useState(question ? false : true)
    const [currentQuestion, setCurrentQuestion] = useState(question)

    const handleSubmit = async (input: string) => {
        updateQuestionAction(questionId, { question: input }, path);
        setCurrentQuestion(input)
        setEditQuestion(false)
    }

    const toggleCancel = () => {
        setEditQuestion(!editQuestion)
    }


    if (!question || editQuestion) {
        return (
            <div className='w-full flex flex-col gap-4'>
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">Select which question to answer:</h2>
                <DropdownInput
                    options={questionOptions}
                    selected={currentQuestion}
                    handleUpdatQuestion={handleSubmit}
                    toggleCancel={toggleCancel}
                />
            </div>
        )
    }

    return (
        <div className='flex flex-col'>
            <p>Currently Selected Question:</p>
            <div className='flex gap-2'>
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">{question}</h2>
                <Button size='sm' variant='ghost' className='border-none' onClick={toggleCancel}>Edit</Button>
            </div>
        </div>
    );
}
