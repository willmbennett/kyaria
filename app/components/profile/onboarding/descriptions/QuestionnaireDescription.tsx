'use client';

import { Button } from "../../../Button";
import { Questionnaire } from '../../../../../models/Profile';
import { useEffect, useState } from 'react';
import UserQuestionnaire from '../../../questionaire/Questionnaire';
import { deleteProfileAction } from "../../../../profile/_action";

const QuestionnaireDescription = ({ questionnaire, userId, profileId }: { questionnaire: Questionnaire | undefined, userId: string, profileId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [questionnaireData, setQuestionnaireData] = useState(questionnaire);

  const updateDisplay = (data: Questionnaire) => {
    setIsEditing(false);
    setQuestionnaireData(data);
  }

  const displayUserData = () => {
    return (
      <>
        {questionnaireData &&
          <div className="bg-white shadow-sm p-6 rounded-lg space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Your Questionnaire Answers</h3>
            <ul className="list-disc pl-5 space-y-2">
              {questionnaireData.desiredRole && (
                <li><strong>Desired Role:</strong> {questionnaireData.desiredRole}</li>
              )}
              {questionnaireData.industryExperience !== undefined && (
                <li><strong>Industry Experience:</strong> {questionnaireData.industryExperience} years</li>
              )}
              {questionnaireData.jobSearchStatus && (
                <li><strong>Job Search Status:</strong> {questionnaireData.jobSearchStatus}</li>
              )}
              {questionnaireData.salaryMin !== undefined && questionnaireData.salaryMax !== undefined && (
                <li><strong>Salary Range:</strong> ${questionnaireData.salaryMin.toLocaleString()} - ${questionnaireData.salaryMax.toLocaleString()}</li>
              )}

            </ul>
            <Button size="md" onClick={() => setIsEditing(true)}>
              Edit Questionnaire
            </Button>
          </div>
        }
      </>
    )
  }

  const displayStartQuestionnaire = () => {
    return (
      <div>
        <ul className="list-disc pl-5 text-left">
          <li>Answer a series of questions to provide detailed information about your skills and experience.</li>
          <li>Receive personalized recommendations based on your questionnaire responses.</li>
          <li>Get insights into areas where you can improve your profile for better job opportunities.</li>
        </ul>
        <Button size="md" className="mt-10" onClick={() => setIsEditing(true)}>
          Start Questionnaire
        </Button>
      </div>
    )
  }

  return (
    <>
      {isEditing ? (<UserQuestionnaire
        userId={userId}
        profileId={profileId}
        currentState={questionnaire}
        updateDisplay={updateDisplay}
      />) : (questionnaireData ?
        displayUserData() :
        displayStartQuestionnaire()
      )}
    </>
  );
};

export default QuestionnaireDescription;
