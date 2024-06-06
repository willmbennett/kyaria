'use client'
import { useState } from 'react';
import { DropdownInput } from './QuestionSelection';
import { Button } from '../Button';
import { updateQuestionAction } from '../../behaviorals/_action';
import { usePathname } from 'next/navigation';

const mockOptions = [
    "Problem-solving: Could you tell me about a complex problem you solved at work? What was your approach to finding a solution?",
    "Learning from mistakes: How did you learn from a mistake you made?",
    "Dealing with challenge: Tell us about an unanticipated challenge you faced. When faced with this challenge, how did you handle it?",
    "When things go wrong: Have you ever experienced a situation in which things did not work out well for you?",
    "Learning new skills: Describe a time when you had to learn something new. In what ways did you approach the learning process?",
    "Communicating with seniors: How have you pitched an idea to a senior colleague? What was the outcome of this task? How did you accomplish it?",
    "Meeting deadlines: Have you ever had to complete a task under time pressure? How did you handle it?",
    "Client handling: How do you deal with difficult clients?",
    "Managing conflicts: Share an example of how you handled a conflict at work.",
    "Taking a different perspective: If you get a chance, what’s the one thing in your professional career that you would handle differently?",
    "Motivating others: When you are in a leadership role, how do you motivate your junior team members?",
    "Managing stress: Share an experience when you had to deal with a lot of stress. How did you manage the pressure?",
    "Setting and achieving goals: Tell me about a time when you set a goal for yourself. How did you achieve it?",
    "Meaningful achievements: What’s your proudest achievement as a professional? Why is it important to you?",
    "Assessing failures: Tell me about your most serious career failure and how you overcame it."
];

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


    if (!question || editQuestion) {
        return (
            <div className='w-full'>
                <DropdownInput options={mockOptions} label='Select a Question' questionId={questionId} selected={currentQuestion} handleUpdatQuestion={handleSubmit} />
            </div>
        )
    }

    return (
        <div className='max-w-3xl'>
            <div className='flex gap-2'>
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">{question}</h2>
                <Button size='sm' variant='ghost' className='border-none' onClick={() => setEditQuestion(true)}>Edit</Button>
            </div>
        </div>
    );
}
