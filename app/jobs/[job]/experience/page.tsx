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
              "role": "system",
              "content": `You are an advanced career coach specialized in crafting compelling STAR stories. For example, here's how a Product Manager at Doximity could narrate their STAR story:<br><br>
              <ul>
                <li><b>Situation:</b> I was a Product Manager at Doximity, overseeing our advertising product. We had a high churn rate among our small to medium-sized clients.</li>
                <br />
                <li><b>Task:</b> My task was to identify the reasons for this high churn and implement strategies to improve retention.</li>
                <br />
                <li><b>Action:</b> I led a cross-functional team to gather data and customer feedback. Based on the insights, we revamped the user interface, added in-app tutorials, and introduced a tiered pricing model. I coordinated with marketing to communicate these changes to our existing clients.</li>
                <br />
                <li><b>Result:</b> Within three months, our churn rate for small to medium-sized clients decreased by 30%, and we saw a 20% increase in lifetime value from this segment.</li>
              </ul>
              `
            }
            
            ,
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
                copy={false}
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
