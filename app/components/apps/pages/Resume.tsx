import ChatWithGPT from '../../board/ChatWithGPT';
import Responsibility from '../components/Responsibility';
import { updateResumeAction } from '../../../board/_action';
import { Education, ProfessionalExperience, Responsibilities } from '../../../../models/Resume';

export default function Resume({
    jobKeyWords,
    job,
    userResume,
    userProfile
}: {
    jobKeyWords: string[],
    job: any,
    userResume: any,
    userProfile: any
}) {

    const message = [
        {
            "role": "system",
            "content": "You are an advanced career coach specialized in writing resume professional resume summaries. Limit the output to two sentances."
        },
        {
            "role": "user",
            "content":
                `I'm applying for this job: ${JSON.stringify(job)}. ${userResume.summary == '' ? "Write me a resume summary" : `Help me improve this resume summary ${userResume.summary}`} based on details from my profile: ${userProfile}`
        }
    ];

    return (
        <>
            <h1 className="text-center sm:text-6xl text-4xl max-w-[708px] font-bold mb-8">
                {userResume.name}
            </h1>
            <div>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Title:</strong> {userResume.title}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Email:</strong> {userResume.email}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Phone:</strong> {userResume.phone}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Location:</strong> {userResume.location}
                </p>
                {userResume.social_links && (
                    <p className="text-left font-medium text-lg mb-4">
                        <a href={userResume.social_links['LinkedIn']} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </p>
                )}
                {userResume.social_links && (
                    <p className="text-left font-medium text-lg mb-4">
                        <a href={userResume.social_links['Github']} target="_blank" rel="noopener noreferrer">Github</a>
                    </p>
                )}

                <h2 className="text-left font-bold text-2xl py-4 mb-4">Summary</h2>
                <ChatWithGPT
                    documentID={userResume._id}
                    message={message}
                    setKey={"summary"}
                    currentState={userResume.summary}
                    saveToDatabase={updateResumeAction}
                    jobKeyWords={jobKeyWords}
                />

                {userResume.areas_of_expertise && (<>
                    <h2 className="text-left font-bold text-2xl py-4 mb-4">Areas of Expertise</h2>
                    <ul className="list-disc list-inside text-left mb-8">
                        {userResume.areas_of_expertise.map((area: any, index: number) => (
                            <li key={index}>{area}</li>
                        ))}
                    </ul>
                </>)}
                {userResume?.skills && (<>
                    <h2 className="text-left font-bold text-2xl py-4 mb-4">Skills</h2>
                    <p className='text-left'>{userResume.skills.join(', ')}</p>
                </>)}
                {userResume.professional_experience && (
                    <>
                        <h2 className="text-left font-bold text-2xl py-4 mb-4">Professional Experience</h2>
                        {userResume.professional_experience
                            // Map the experiences to include the original index
                            .map((exp: ProfessionalExperience, index: number) => ({
                                exp,
                                originalIndex: index,
                            }))
                            // Then, sort the array of mapped objects
                            .sort((a: any, b: any) => {
                                // Check if either a or b has 'present' as end_date
                                if (a.exp.end_date === 'present' && b.exp.end_date !== 'present') {
                                    return -1; // 'present' comes before other dates
                                } else if (a.exp.end_date !== 'present' && b.exp.end_date === 'present') {
                                    return 1; // 'present' comes before other dates
                                } else {
                                    // Compare the end_date values as timestamps (assuming they are in ISO date format)
                                    const dateA = new Date(a.exp.end_date).getTime();
                                    const dateB = new Date(b.exp.end_date).getTime();
                                    return dateB - dateA; // Sort other dates in descending order
                                }
                            })
                            // Filter the experiences to only include those where `show` is true
                            .filter(({ exp }: { exp: ProfessionalExperience }) => exp.show !== false && exp.show !== null)
                            // Map the sorted objects to components
                            .map(({ exp, originalIndex }: { exp: ProfessionalExperience, originalIndex: number }) => (
                                <div key={exp._id || originalIndex} className="mb-8">
                                    <h3 className="text-left font-bold text-lg mb-2">{exp.title} at {exp.company}</h3>
                                    <p className="text-left text-lg mb-2">{exp.location}</p>
                                    <p className="text-left text-lg mb-2">{exp.start_date} - {exp.end_date}</p>
                                    <ul className="list-disc list-inside text-left mb-8">
                                        {exp.responsibilities && exp.responsibilities.map((resp: Responsibilities, i: number) => (
                                            <Responsibility
                                                documentID={userResume._id}
                                                setKey={`professional_experience.${originalIndex}.responsibilities.${i}.content`}
                                                content={resp.content || ''}
                                                message={[
                                                    {
                                                        "role": "system",
                                                        "content": `You are an advanced career coach specialized in writing resume professional experience bullet points. 
                                  Examples:
                                  1. Maintained a 97% customer satisfaction rating as a customer care representative.
                                  2. Exceeded department sales goals by an average of 15% quarter-on-quarter in 2016.
                                  3. Cut page loading time by 50% by building a new cloud infrastructure, leading to a better customer experience.`
                                                    },
                                                    {
                                                        "role": "user",
                                                        "content": `I'm applying for this job: ${JSON.stringify(job)}. Help me improve this resume bullet point: ${resp.content}. Keep the output under 132 characters.`
                                                    }
                                                ]}
                                                saveToDatabase={updateResumeAction}
                                                parentIndex={originalIndex}
                                                childIndex={i}
                                                jobKeyWords={jobKeyWords}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </>
                )}


                {
                    userResume.education && (
                        <>
                            <h2 className="text-left font-bold text-2xl py-4 mb-4">Education</h2>
                            {userResume.education
                                // Map the education items to include the original index
                                .map((edu: Education, index: number) => ({
                                    edu,
                                    originalIndex: index,
                                }))
                                // Filter out the education items where `show` is not true
                                .filter(({ edu }: { edu: Education }) => edu.show !== false && edu.show !== null)
                                // Then, sort the filtered array of mapped objects
                                .sort((a: any, b: any) => {
                                    // Check if either a or b has 'present' as end_date
                                    if (a.edu.end_date === 'present' && b.edu.end_date !== 'present') {
                                        return -1; // 'present' comes before other dates
                                    } else if (a.edu.end_date !== 'present' && b.edu.end_date === 'present') {
                                        return 1; // 'present' comes before other dates
                                    } else {
                                        // Compare the end_date values as timestamps (assuming they are in ISO date format)
                                        const dateA = new Date(a.edu.end_date).getTime();
                                        const dateB = new Date(b.edu.end_date).getTime();
                                        return dateB - dateA; // Sort other dates in descending order
                                    }
                                })
                                // Map the sorted objects to components
                                .map(({ edu, originalIndex }: { edu: Education, originalIndex: number }) => (
                                    <div key={edu._id || originalIndex} className="mb-8">
                                        <h3 className="text-left font-bold text-lg mb-2">{edu.degree} at {edu.institution}</h3>
                                        <p className="text-left text-lg mb-2">{edu.location}</p>
                                        <p className="text-left text-lg mb-2">{edu.start_date} - {edu.end_date}</p>
                                        {edu.details && edu.details.map((detail, i) => (
                                            <Responsibility
                                                documentID={userResume._id}
                                                setKey={`education.${originalIndex}.details.${i}.content`}
                                                content={detail.content || ''}
                                                message={[
                                                    {
                                                        "role": "system",
                                                        "content": `You are an advanced career coach specialized in writing resume education accomplishments bullet points. 
                                  Examples:
                                  1. Maintained a 97% customer satisfaction rating as a customer care representative.
                                  2. Exceeded department sales goals by an average of 15% quarter-on-quarter in 2016.
                                  3. Cut page loading time by 50% by building a new cloud infrastructure, leading to a better customer experience.`
                                                    },
                                                    {
                                                        "role": "user",
                                                        "content": `I'm applying for this job: ${JSON.stringify(job)}. Help me improve this resume bullet point: ${detail.content}. Keep the output under 132 characters.`
                                                    }
                                                ]}
                                                saveToDatabase={updateResumeAction}
                                                parentIndex={originalIndex}
                                                childIndex={i}
                                                jobKeyWords={jobKeyWords}
                                            />
                                        ))}
                                    </div>
                                ))
                            }
                        </>
                    )
                }

            </div>
        </>
    );
}
