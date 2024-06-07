'use client'
import { useState } from 'react';
import { Button } from '../Button';
import { createQuestionAction } from '../../behaviorals/_action';
import { useRouter } from 'next/navigation';
import { IconSpinner } from '../ui/icons'; // Ensure you have a spinner icon component

interface Question {
    id: string;
    text: string;
}

interface CreateQuestionProps {
    userId: string;
    questionOptions: string[];
    currentQuestions: string[];
}

export const BehavioralsHomePage = ({ userId, questionOptions, currentQuestions }: CreateQuestionProps) => {
    const router = useRouter();
    const [newQuestion, setNewQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCreateQuestion = async (newQuestion: string) => {
        setLoading(true);
        setError('');
        try {
            const { newQuestionId } = await createQuestionAction({ userId, question: newQuestion });
            setNewQuestion('');
            if (newQuestionId) {
                router.push(`/behaviorals/${newQuestionId}`);
            }
        } catch (err) {
            setLoading(false);
            setError('Failed to create question.');
        }
    };

    const filteredOptions = questionOptions.filter(option => !currentQuestions.includes(option));

    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                {loading ? (
                    <div className='flex justify-center items-center h-96 gap-2'>
                        Creating your question <IconSpinner />
                    </div>
                ) : (
                    <>
                        <h2 className="text-lg font-semibold leading-tight text-slate-900">
                            Select a question:
                        </h2>
                        <ul className='flex flex-col h-96 overflow-y-scroll p-2 bg-slate-100 border rounded-xl gap-2'>
                            {filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    className='text-slate-500 text-sm p-4 border bg-white rounded-lg cursor-pointer hover:bg-slate-200 hover:text-slate-700 hover:shadow'
                                    onClick={() => handleCreateQuestion(option)}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                        <div className='flex flex-col gap-2 mt-4'>
                            <label htmlFor='newQuestion' className='text-lg font-semibold leading-tight text-slate-900'>Or enter a your own:</label>
                            <textarea
                                id='newQuestion'
                                className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                                rows={4}
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                            />
                            <Button size='sm' onClick={() => handleCreateQuestion(newQuestion)} disabled={loading}>Create Question</Button>
                            {error && <p className='text-red-500'>{error}</p>}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
