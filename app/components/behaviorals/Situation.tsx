'use client'
import { useEffect, useState } from 'react';
import { DropdownInput } from './QuestionSelection';
import { Button } from '../Button';
import { suggestOptions, updateQuestionAction } from '../../behaviorals/_action';
import { usePathname } from 'next/navigation';
import { ResumeClass } from '../../../models/Resume';
import { IconSpinner } from '../ui/icons';

export const Situation = ({
    questionId,
    question,
    situation,
    resume,
}: {
    questionId: string,
    question: string
    situation?: string
    resume: ResumeClass,
}) => {
    const path = usePathname()
    const [editSituation, setEditSituation] = useState(situation ? false : true)
    const [currentSituation, setCurrentSituaion] = useState(situation)
    const [options, setOptions] = useState([])

    const handleSubmit = async (input: string) => {
        updateQuestionAction(questionId, { situation: input }, path);
        setCurrentSituaion(input)
        setEditSituation(false)
    }

    const handleOptionCreation = async () => {
        const { options: newOptions } = await suggestOptions(questionId, question, resume, path)
        if (newOptions) {
            setOptions(newOptions)
        }
    }

    useEffect(() => {
        if (options.length == 0 && editSituation) {
            handleOptionCreation()
        }
    }, [options, editSituation])

    if (currentSituation && !editSituation) {
        return (
            <div className='max-w-3xl'>
                <h2 className="text-lg font-semibold leading-tight text-slate-900">Situation</h2>
                <div className='flex gap-2'>
                    <h2 className="text-md">{currentSituation}</h2>
                    <Button size='sm' variant='ghost' className='border-none' onClick={() => setEditSituation(true)}>Edit</Button>
                </div>
            </div>
        );
    }

    if (editSituation && options.length == 0) {
        return (
            <div className='flex items-center justify-center gap-2'>
                <p className='text-md text-slate-400'>Finding the best situations to discuss from your resume</p>
                <IconSpinner />
            </div>
        )
    }


    if (editSituation) {
        return (
            <div className='w-full'>
                <DropdownInput options={options} label='Select An Experience' questionId={questionId} selected={currentSituation} handleUpdatQuestion={handleSubmit} />
            </div>
        )
    }

    return (
        <></>
    );
}
