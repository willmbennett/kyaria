'use client'
import { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import { suggestOptions, updateQuestionAction } from '../../_action';
import { usePathname } from 'next/navigation';
import { ResumeClass } from '../../../../models/Resume';
import { IconSpinner } from '../../../components/ui/icons';

interface Option {
    accomplishment: string;
    explanation: string;
}

export const Situation = ({
    questionId,
    question,
    situation,
    resume,
}: {
    questionId: string,
    question: string,
    situation?: string,
    resume: ResumeClass,
}) => {
    const path = usePathname();
    const [editSituation, setEditSituation] = useState(!situation);
    const [currentSituation, setCurrentSituation] = useState(situation);
    const [options, setOptions] = useState<Option[]>([]);
    const [customSituation, setCustomSituation] = useState('');
    const [loadingOptions, setLoadingOptions] = useState(false)

    const fetchOptions = async () => {
        setLoadingOptions(true)
        const response = await suggestOptions(questionId, question, resume, path);
        setLoadingOptions(false)
        if (response && response.options) {
            setOptions(response.options);
        }
    };

    useEffect(() => {
        if (editSituation && options.length === 0) {
            fetchOptions();
        }
    }, [editSituation, options.length, questionId, question, resume, path]);

    const handleSubmit = async (input: string) => {
        await updateQuestionAction(questionId, { situation: input }, path);
        setCurrentSituation(input);
        setEditSituation(false);
    };

    const toggleEdit = () => {
        setEditSituation(!editSituation);
    };

    const handleCustomSubmit = async () => {
        if (customSituation) {
            await handleSubmit(customSituation);
        }
    };

    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <h2 className="text-lg font-semibold leading-tight text-slate-900">
                    Select the best situation to answer this question:
                </h2>
                <p className='text-slate-500 text-sm'>{question}</p>
            </div>
            {(currentSituation && !editSituation) ? (
                <div className='flex flex-col'>
                    <div className='flex gap-2 items-center'>
                        <h2 className="text-lg font-semibold leading-tight text-slate-900">
                            Currently selected situation:
                        </h2>
                        <Button size='sm' variant='ghost' className='border-none' onClick={toggleEdit}>
                            Edit
                        </Button>
                    </div>
                    <p className='text-slate-500 text-sm'>{currentSituation}</p>
                </div>
            ) : (
                <div className='w-full flex flex-col gap-4'>
                    <div className='flex flex-col h-96 overflow-y-scroll p-2 bg-slate-100 border rounded-xl gap-2'>
                        {loadingOptions ?
                            (<div className='flex items-center justify-center gap-2' >
                                <p className='text-md text-slate-400'>Finding the best situations to discuss from your resume</p>
                                <IconSpinner />
                            </div >) :
                            options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border bg-white rounded-lg hover:bg-slate-200 cursor-pointer ${currentSituation === option.accomplishment ? 'bg-slate-800' : 'border-gray-300'}`}
                                    onClick={() => handleSubmit(option.accomplishment)}
                                >
                                    <h3 className="text-md font-semibold">{option.accomplishment}</h3>
                                    <p className="text-sm text-slate-500">{option.explanation}</p>
                                </div>
                            ))
                        }
                    </div >
                    <div className='flex items-center gap-2'>
                        <Button size='sm' variant='ghost' onClick={fetchOptions}>Refresh Options</Button>
                        <Button size='sm' variant='ghost' onClick={toggleEdit}>Cancel</Button>
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <label htmlFor='customSituation' className='text-md font-semibold'>Or enter a custom situation:</label>
                        <textarea
                            id='customSituation'
                            className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            rows={4}
                            value={customSituation}
                            onChange={(e) => setCustomSituation(e.target.value)}
                        />
                        <Button size='sm' onClick={handleCustomSubmit}>Submit Custom Situation</Button>
                    </div>
                </div >
            )}
        </div >
    );
};