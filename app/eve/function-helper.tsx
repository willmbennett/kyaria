// interview-questions.json file should be imported as a module
import InterviewQuestions from './interview-questions.json';

// Define types for the disciplines and interview types
type Discipline = 'SoftwareEngineering' | 'CyberSecurity' | 'DataScience';
type InterviewType = 'Behavioral' | 'Technical' | 'Situational';

// Define the structure of a question
interface Question {
    question: string;
}

// Helper function to get random questions
const getRandomQuestions = (questions: Question[], numQuestions: number): Question[] => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
}

// Main function to start the mock interview
export const getInterviewQuesions = (discipline: Discipline, interviewType: InterviewType): Question[] => {
    const questions = InterviewQuestions.interviewQuestions[discipline][interviewType];

    if (!questions) {
        console.error("Invalid discipline or interview type.");
        return [];
    }

    const selectedQuestions = getRandomQuestions(questions, 5);
    return selectedQuestions;
}
