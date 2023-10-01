import Detail from '../components/Details';
import StarStory from '../components/StarStory';

export default function Experience({
    jobApp,
}: {
    jobApp: any,
}) {

    return (
        <>
            <h1 className="text-center sm:text-6xl text-4xl max-w-[708px] font-bold mb-8">
                Let's talk experience
            </h1>
            <p>Adding details to your profile will help us write your better star stories.</p>
            <div className="p-6 w-full">
                <h2 className="text-left font-bold text-2xl py-4 mb-4">Professional Experience</h2>
                {jobApp.userResume.professional_experience.map((exp: any, index: number) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-left font-bold text-lg mb-2">{exp.title} at {exp.company}</h3>
                        <p className="text-left text-lg mb-2">{exp.location}</p>
                        <p className="text-left text-lg mb-2">{exp.start_date} - {exp.end_date}</p>
                        <ul className="list-disc list-inside text-left mb-8">
                            {exp.responsibilities.map((resp: any, i: number) => {
                                return (
                                    <div key={i} className="my-4">
                                        <div className="py-2">
                                            <h3 className="text-left font-bold text-lg mb-2">{resp.content}</h3>
                                        </div>
                                        <div className='rounded-lg w-full p-1'>
                                            {resp.detail && (
                                                <Detail
                                                    detail={resp.detail}
                                                    parentIndex={index}
                                                    childIndex={i}
                                                />
                                            )}
                                            <StarStory
                                                jobApp={jobApp}
                                                documentID={jobApp.userResume._id}
                                                setKey={`professional_experience.${index}.responsibilities.${i}.starStory`}
                                                content={resp.content}
                                                details={resp.detail || ''}
                                                currentState={resp.starStory}
                                                parentIndex={index}
                                                childIndex={i}
                                            />
                                        </div>
                                    </div>
                                );
                            })}

                        </ul>
                    </div>
                ))}
                <div className="p-6 w-full">
                    <h2 className="text-left font-bold text-2xl py-4 mb-4">Education</h2>
                    {jobApp.userResume.education.map((edu: any, index: number) => (
                        <div key={index} className="mb-8">
                            <h3 className="text-left font-bold text-lg mb-2">{edu.degree}</h3>
                            <p className="text-left text-lg mb-2">{edu.institution}, {edu.location}</p>
                            <ul className="list-disc list-inside text-left mb-8">
                                {edu.details && edu.details.map((detail: any, i: number) => (
                                    <div key={i}>
                                        <div key={i} className="my-4">
                                            <div className="py-2">
                                                <h3 className="text-left font-bold text-lg mb-2">{detail.content}</h3>
                                            </div>
                                            <div className='rounded-lg shadow-md w-full p-1 bg-gray-50'>
                                                {detail.detail && (
                                                    <Detail
                                                        detail={detail.detail}
                                                        parentIndex={index}
                                                        childIndex={i}
                                                    />
                                                )}
                                                <StarStory
                                                    jobApp={jobApp}
                                                    documentID={jobApp.userResume._id}
                                                    setKey={`professional_experience.${index}.responsibilities.${i}.starStory`}
                                                    content={detail.content}
                                                    details={detail.detail || ''}
                                                    currentState={detail.starStory}
                                                    parentIndex={index}
                                                    childIndex={i}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
