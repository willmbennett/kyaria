import { ProfileClass } from '../../../../models/Profile';
import StarStory from './StarStory';

export default function Experience({
    jobData,
    userResume,
}: {
    jobData: any,
    userResume: ProfileClass,
}) {

    return (
        <>
            <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                Star Stories
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                <h2 className="text-left font-bold text-2xl py-4 mb-4">Professional Experience</h2>
                {userResume.professional_experience && userResume.professional_experience.map((exp: any, index: number) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-left font-bold text-lg mb-2">{exp.title} at {exp.company}</h3>
                        <p className="text-left text-lg mb-2">{exp.location}</p>
                        <p className="text-left text-lg mb-2">{exp.start_date} - {exp.end_date}</p>
                        <ul className="list-disc list-inside text-left mb-8">
                            {exp.responsibilities.map((resp: any, i: number) => (<div key={i}>
                                <p>{resp.content}</p>
                                <StarStory
                                    documentID={jobData._id}
                                    setKey={`userResume.professional_experience.${index}.responsibilities.${i}.starStory`}
                                    content={resp.starStory}
                                    message={[
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
                                            content: `Create a STAR story for this text: "${resp.content}" based on this job post: ${JSON.stringify(jobData)}`
                                        }
                                    ]}
                                />
                            </div>))}
                        </ul>
                    </div>
                ))}

                <h2 className="text-left font-bold text-2xl py-4 mb-4">Education</h2>
                {userResume.education && userResume.education.map((edu, index) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-left font-bold text-lg mb-2">{edu.degree}</h3>
                        <p className="text-left text-lg mb-2">{edu.institution}, {edu.location}</p>
                        <ul className="list-disc list-inside text-left mb-8">
                            {edu.details && edu.details.map((detail, i) => (<div key={i}>
                                <p>{detail.content}</p>
                                <StarStory
                                    documentID={jobData._id}
                                    setKey={`userResume.professional_experience.${index}.responsibilities.${i}.starStory`}
                                    content={detail.starStory || ''}
                                    message={[
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
                                            content: `Create a STAR story for this text: "${detail.content}" based on this job post: ${JSON.stringify(jobData)}`
                                        }
                                    ]}
                                />
                            </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
