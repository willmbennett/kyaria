'use client';
import ChatWithGPT from '../../../components/ChatWithGPT';
import { useContext, useEffect } from 'react';
import { JobContext } from '../../../components/jobs/JobContext';

export default function Page() {
  const { starStories, setStarStories, jobData, profileData } = useContext(JobContext);

  const generateStarStories = () => {
    return profileData.professional_experience.map((experience, expIndex) => (
      <div key={expIndex}>
        <br />
        <h2 className="text-left font-bold text-2xl mb-4">{experience.title} at {experience.company}</h2>  {/* Role title here */}
        {experience.responsibilities.map((responsibility, respIndex) => {
          const message = [
            {
              role: "system",
              content: "You are an advanced career coach specialized in crafting compelling STAR stories. Return the response using html in bullet point format with the STAR section bolded but no bullet points."
            },
            {
              role: "user",
              content: `Create a STAR story for this responsibility: "${responsibility}" based on this job post: ${JSON.stringify(jobData)}`
            }
          ];

          return (
            <div key={`${expIndex}-${respIndex}`}>
              <h3 className="text-left font-semibold text-xl mb-3">{responsibility}</h3>
              <ChatWithGPT
                message={message}
                currentState={starStories[`${expIndex}-${respIndex}`] || ''}
                updateState={(newStory: string) => {
                  setStarStories({
                    ...starStories,
                    [`${expIndex}-${respIndex}`]: newStory
                  });
                }}
                refresh={true}
                temp={0.5}
              />
              <br />
            </div>
          );
        })}
      </div>
    ));
  };

  useEffect(() => {
    generateStarStories();
  }, [profileData, jobData]);

  return (
    <div>
      <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
        Let's talk about your experience
      </h1>
      {generateStarStories()}
    </div>
  );
}
