'use client'

export const InterviewGrades = ({ score }: {
    score: {
        question: string;
        explanation: string; // Added explanation field
        score: number
    }
}) => {
    return (
        <div className="container mx-auto p-4">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Score</th>
                        <th className="border p-2">Explanation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border p-2 text-center">{score.score}</td>
                        <td className="border-b border-x p-2">{score.explanation}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
