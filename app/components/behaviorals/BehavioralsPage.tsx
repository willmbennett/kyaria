'use client'
import { useResumeDropDown } from '../../../lib/hooks/use-resume-dropdown';
import { ResumeDropAndSelect } from '../ResumeDropAndSelect';
import { Answer } from './Answer';
import { Question } from './Question';
import { Situation } from './Situation';

export const BehavioralsPage = ({
    questionId,
    userId,
    userResume,
    question,
    situation,
    details,
    answer,
}: {
    questionId: string,
    userId: string,
    userResume?: string,
    question?: string,
    situation?: string,
    details?: string,
    answer?: string
}) => {

    const { hasResumes, selectedResumeId, setSelectedResumeId, resumes, resume } = useResumeDropDown({ userId, userResume })

    if (!question) {
        return (
            <div className='max-w-3xl'>
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">Select which question to answer:</h2>
                <Question questionId={questionId} />
            </div>
        )
    }

    return (
        <div className='max-w-3xl flex flex-col gap-4 items-start'>
            <Question questionId={questionId} question={question} />
            <div className='w-full'>
                <ResumeDropAndSelect
                    userId={userId}
                    resumes={resumes}
                    hasResumes={hasResumes}
                    selectedResumeId={selectedResumeId}
                    setSelectedResumeId={setSelectedResumeId}
                />
            </div>
            {resume &&
                <>
                    <Situation
                        questionId={questionId}
                        question={question}
                        resume={resume}
                        situation={situation}
                    />
                    {situation &&
                        <Answer
                            questionId={questionId}
                            question={question}
                            situation={situation}
                            details={details}
                            answer={answer}
                        />
                    }
                </>
            }
        </div>
    );
}
