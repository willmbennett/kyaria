'use client'

import { useContext } from 'react';
import { JobContext } from '../../../components/jobs/JobContext';
import { Resume } from '../../../components/jobs/Resume';

export default function ResumePage() {
    let { jobData, profileData, newResume, setNewResume } = useContext(JobContext);
    
  return (
    <div>
        
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
            Let's work on your Resume
        </h1>
        <br />
        <Resume
            jobData={jobData}
            profileData={profileData}
            newResume={newResume}
            setNewResume={setNewResume}
        />
    </div>
  );
}
