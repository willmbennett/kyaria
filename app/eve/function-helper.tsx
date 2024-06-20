// interview-questions.json file should be imported as a module
import { format } from 'date-fns';
import InterviewQuestions from './interview-questions.json';

// Define types for the disciplines and interview types
type Discipline = 'SoftwareEngineering' | 'CyberSecurity' | 'DataScience';
type InterviewType = 'PhoneScreen' | 'Behavioral' | 'Case' | 'Technical';

// Define the structure of a question
interface Question {
    question: string;
}

// Helper function to get random questions from each section
const getRandomQuestionsFromSection = (questions: Question[], numQuestions: number): Question[] => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
}

// Main function to start the mock interview
export const getInterviewQuestions = (discipline: Discipline, interviewType: InterviewType): Question[] => {
    const questions = InterviewQuestions[discipline][interviewType];

    if (!questions) {
        return [];
    }

    const introQuestions = getRandomQuestionsFromSection(questions.intro, 2); // Adjust the number as needed
    const mainQuestions = getRandomQuestionsFromSection(questions.main, 5); // Adjust the number as needed
    const closingQuestions = getRandomQuestionsFromSection(questions.closing, 1); // Adjust the number as needed

    const selectedQuestions = [...introQuestions, ...mainQuestions, ...closingQuestions];
    return selectedQuestions;
}

export const parseInterviewArgs = (discipline: Discipline, interviewType: InterviewType) => {
    // Helper function to convert PascalCase to normal string
    function pascalCaseToString(pascalCase: string) {
        return pascalCase
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')  // Add space before capital letters
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')  // Add space between consecutive capital letters
            .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
    }

    // Convert the discipline and interviewType from PascalCase to normal strings
    const disciplineString = pascalCaseToString(discipline);
    const interviewTypeString = pascalCaseToString(interviewType);

    // Get the current date
    const date = new Date()

    // Create the interview name
    const interviewName = `${disciplineString} ${interviewTypeString} - ${format(date, 'LLLL d, yyyy')}`;

    // Return the interview name
    return interviewName;
}
