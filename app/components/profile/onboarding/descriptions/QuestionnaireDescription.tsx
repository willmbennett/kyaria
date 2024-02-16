'use client';

import { Button } from "../../../Button";
import { Questionnaire } from '../../../../../models/Profile';
import { useEffect, useState } from 'react';
import UserQuestionnaire from '../../../questionaire/Questionnaire';
import { deleteProfileAction } from "../../../../profile/_action";

const QuestionnaireDescription = ({ questionnaire, userId, profileId }: { questionnaire: Questionnaire | undefined, userId: string, profileId: string }) => {
  const [isEditing, setIsEditing] = useState(false);

  const updateDisplay = (data: Questionnaire) => {
    setIsEditing(false);
  }

  const displayUserData = () => {
    return (
      <>
        {questionnaire &&
          <div className="bg-white shadow-sm p-6 rounded-lg space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Your Questionnaire Answers</h3>
            <ul className="list-disc pl-5 space-y-2">
              {questionnaire.desiredRole && (
                <li><strong>Desired Role:</strong> {questionnaire.desiredRole}</li>
              )}
              {questionnaire.industryExperience !== undefined && (
                <li><strong>Industry Experience:</strong> {questionnaire.industryExperience} years</li>
              )}
              {questionnaire.jobSearchStatus && (
                <li><strong>Job Search Status:</strong> {questionnaire.jobSearchStatus}</li>
              )}
              {questionnaire.salaryMin !== undefined && questionnaire.salaryMax !== undefined && (
                <li><strong>Salary Range:</strong> ${questionnaire.salaryMin.toLocaleString()} - ${questionnaire.salaryMax.toLocaleString()}</li>
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
      />) : (questionnaire ?
        displayUserData() :
        displayStartQuestionnaire()
      )}
    </>
  );
};

export default QuestionnaireDescription;
