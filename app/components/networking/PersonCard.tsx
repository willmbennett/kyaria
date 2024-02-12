import Link from "next/link";
import { PersonClass } from "../../../models/Person";
import PersonSummary from "./ChatOutput";
import { ResumeClass } from "../../../models/Resume";
import { Button } from "../Button";
import { useState } from "react";
import { Message } from "ai";

// Define the props for the component
interface PersonCardProps {
    person: Partial<PersonClass>;
    userResume: ResumeClass
}

export default function PersonCard(
    {
        person,
        userResume
    }: PersonCardProps
) {
    const [cardContent, setCardContent] = useState<'About' | 'Email' | 'LinkedIn'>('About')
    const {
        image,
        name,
        summary,
        crunchbaseUri,
        linkedInUri,
        emailAddresses,
        description
    } = person


    const emailMessages: Message[] = [
        {
            id: "2",
            role: "user",
            content: `Please write me a networking email that I can send to this person: ${JSON.stringify(person)}. Here is my resume: ${JSON.stringify(userResume)}.`
        },
        { id: '3', role: 'assistant', content: '' }
    ]

    const linkedInMessages: Message[] = [
        {
            id: '1',
            role: "system",
            content: `Craft a concise, professional LinkedIn outreach message to a recruiter, focusing on a specific job interest. The message should be engaging, personalized, and under 300 characters. Include key elements like a brief introduction, something they have in common, and an invitation for further discussion. Tone: conversational, spartan, use less corporate jargon
Example:
Hi Mariah,

Although I’ve never gotten the chance to work with you directly, I’ve heard rave reviews about your sales techniques and ability to work with tough clients. Hopefully one of these days I can see you in action! ’Til then, I’ll catch you in the break room.

Best,

Emily`
        },
        {
            id: "2",
            role: "user",
            content: `Please write me a linkedIn connection request that I can send to this person: ${JSON.stringify(person)}. Here is my resume: ${JSON.stringify(userResume)}. Tone: conversational, spartan, use less corporate jargon`
        },
        { id: '3', role: 'assistant', content: '' }
    ]

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden w-full flex flex-row space-x-2 p-3">
            {/* Image container with responsive image and circular style */}
            <div className="w-1/3">
                <div className="flex justify-center mt-5">
                    {image ? (
                        <img className="rounded-full w-32 h-32 object-cover" src={image} alt={`${name}'s profile picture`} />
                    ) : (
                        <div className="w-32 h-32 rounded-full flex items-center justify-center border">
                            <svg className="svg-icon w-1/2 h-auto" viewBox="0 0 20 20">
                                <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                            </svg>
                        </div>
                    )}
                </div>

                <div className="p-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 text-center">{name}</h5>
                    <p className="text-gray-700 dark:text-gray-400 mt-2 text-center">{summary}</p>
                    {/*<p className="line-clamp-3 text-xs">
                    {description}
                </p> */}
                    <div className="flex justify-around space-x-2 mt-4">
                        <Link href={`https://www.${crunchbaseUri}`} target="_blank">
                            <span className="text-indigo-600 hover:text-indigo-900 transition duration-300" aria-label="Crunchbase profile">
                                Crunchbase Profile
                            </span>
                        </Link>
                        <Link href={`https://www.${linkedInUri}`} target="_blank">
                            <span className="text-indigo-600 hover:text-indigo-900 400 transition duration-300" aria-label="LinkedIn profile">
                                LinkedIn Profile
                            </span>
                        </Link>
                    </div>

                    {emailAddresses && emailAddresses.length > 0 && (<>
                        <p className="text-gray-700 dark:text-gray-400 mt-2 text-center">Contact Info</p>
                        <ul>
                            {emailAddresses.map((e, i) => (
                                <li key={i}>{e.contactString}</li>
                            ))}
                        </ul>
                    </>)}
                </div>
            </div>
            <div className="w-2/3 text-center">
                <div className="flex justify-center space-x-4 p-4">
                    <Button
                        onClick={() => setCardContent('About')}
                        disabled={cardContent === 'About'}
                        variant={cardContent === 'About' ? 'solid' : 'ghost'}
                        size="md"
                        color="dark"
                        type="button"
                    >
                        About
                    </Button>

                    <Button
                        onClick={() => setCardContent('Email')}
                        disabled={cardContent === 'Email'}
                        variant={cardContent === 'Email' ? 'solid' : 'ghost'}
                        size="md"
                        color="dark"
                        type="button"
                    >
                        Email
                    </Button>

                    <Button
                        onClick={() => setCardContent('LinkedIn')}
                        disabled={cardContent === 'LinkedIn'}
                        variant={cardContent === 'LinkedIn' ? 'solid' : 'ghost'}
                        size="md"
                        color="dark"
                        type="button"
                    >
                        LinkedIn
                    </Button>
                </div>

                {cardContent == 'About' &&
                    <>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 text-center">About {name}</h5>
                        <p>{person.description ? person.description : 'Description not found'}</p>
                    </>
                }
                {cardContent == 'Email' &&
                    <>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 text-center">About {name}</h5>
                        <PersonSummary initialMessages={emailMessages} />
                    </>
                }
                {cardContent == 'LinkedIn' &&
                    <>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 text-center">About {name}</h5>
                        <PersonSummary initialMessages={linkedInMessages} />
                    </>
                }
            </div>
        </div>
    );
}
