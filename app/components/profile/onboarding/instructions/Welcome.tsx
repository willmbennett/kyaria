import React, { useEffect } from 'react';
import { OnboardingStage } from '../Enum';
import { ResumeClass } from '../../../../../models/Resume';
import { Questionnaire } from '../../../../../models/Profile';

const WelcomeMessage = () => {
  return (
    <div className="max-w-xl my-8">
      <p className="mb-4">Welcome to your profile! Begin by uploading your resume and completing the questionnaire. These steps enable us to create a personalized elevator pitch, enhance your LinkedIn biography, and assist you in refining your interview narratives.</p>
    </div>
  );
};

export default WelcomeMessage;
