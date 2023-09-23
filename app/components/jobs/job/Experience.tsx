import StarStory from './StarStory';

export default function Experience({
    jobApp,
    updateExperienceStarStory,
    updateEductionStarStory,
}: {
    jobApp: any,
    updateExperienceStarStory: any,
    updateEductionStarStory: any,
}) {

    return (
        <>
            <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                Star Stories
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                <h2 className="text-left font-bold text-2xl py-4 mb-4">Professional Experience</h2>
                {jobApp.userResume.professional_experience.map((exp: any, index: number) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-left font-bold text-lg mb-2">{exp.title} at {exp.company}</h3>
                        <p className="text-left text-lg mb-2">{exp.location}</p>
                        <p className="text-left text-lg mb-2">{exp.start_date} - {exp.end_date}</p>
                        <ul className="list-disc list-inside text-left mb-8">
                            {exp.responsibilities.map((resp: any, i: number) => (<div key={i}>
                                <p>{resp.content}</p>
                                <StarStory
                                    jobApp={jobApp}
                                    documentID={jobApp.userResume._id}
                                    setKey={`professional_experience.${index}.responsibilities.${i}.starStory`}
                                    content={jobApp.userResume.professional_experience[index].responsibilities[i].content}
                                    details={jobApp.profile.professional_experience[index].responsibilities[i].starStory}
                                    currentState={jobApp.userResume.professional_experience[index].responsibilities[i].starStory}
                                    updateState={updateExperienceStarStory}
                                    parentIndex={index}
                                    childIndex={i}
                                />
                            </div>))}
                        </ul>
                    </div>
                ))}

                <h2 className="text-left font-bold text-2xl py-4 mb-4">Education</h2>
                {jobApp.userResume.education.map((edu: any, index: number) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-left font-bold text-lg mb-2">{edu.degree}</h3>
                        <p className="text-left text-lg mb-2">{edu.institution}, {edu.location}</p>
                        <ul className="list-disc list-inside text-left mb-8">
                            {edu.details && edu.details.map((detail: any, i: number) => (<div key={i}>
                                <p>{detail.content}</p>
                                <StarStory
                                    jobApp={jobApp}
                                    documentID={jobApp.userResume._id}
                                    setKey={`professional_experience.${index}.responsibilities.${i}.starStory`}
                                    content={jobApp.userResume.education[index].details[i].content}
                                    details={jobApp.profile.education[index].details[i].starStory}
                                    currentState={jobApp.userResume.education[index].details[i].starStory}
                                    updateState={updateEductionStarStory}
                                    parentIndex={index}
                                    childIndex={i}
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
