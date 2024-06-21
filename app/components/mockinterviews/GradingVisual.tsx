import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IconSpinner } from '../ui/icons';

interface GradingVisualProps {
    overallScore: number;
}

const getColorForScore = (score: number) => {
    if (score <= 3) return '#FF0000'; // Red
    if (score <= 6) return '#FFA500'; // Orange
    return '#008000'; // Green
};

const GradingVisual: React.FC<GradingVisualProps> = ({ overallScore }) => {
    const isGrading = Number.isNaN(overallScore)
    const score = isGrading ? 0 : overallScore
    const textValue = isGrading ? 'N/A' : `${score}`
    const color = isGrading ? '#000000' : getColorForScore(score);

    return (
        <div className="grading-visual-container">
            <div className="circular-progress flex flex-col justify-center items-center">
                <div className='flex items-center justify-center gap-2'>
                    <p className="overall-score-label mb-4">{isGrading ? 'Grading' : 'Overall Score'} </p>
                    {isGrading && <IconSpinner />}
                </div>
                <CircularProgressbar
                    value={score}
                    minValue={0}
                    maxValue={10}
                    text={textValue}
                    styles={buildStyles({
                        pathColor: color,
                        textColor: color,
                        trailColor: '#d6d6d6',
                        backgroundColor: '#e0f2f1',
                    })}
                />
            </div>
        </div>
    );
};

export default GradingVisual;
