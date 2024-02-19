import Link from "next/link";
import { PersonClass } from "../../../models/Person";
import ChatOutput from "./ChatOutput";
import { ResumeClass } from "../../../models/Resume";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { Message } from "ai";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

// Define the props for the component
interface PersonCardProps {
    person: Partial<PersonClass>
}

export default function PersonCard(
    {
        person
    }: PersonCardProps
) {
    const {
        _id,
        image,
        name,
        summary,
        crunchbaseUri,
        linkedInUri,
        emailAddresses,
        description
    } = person

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden flex flex-col w-full md:flex-row p-6 space-y-4 md:space-y-0 md:space-x-4">
            {/* Image & Basic Info Container */}
            <div className="flex md:w-1/3 flex-col items-center space-y-3 text-center justify-center">
                {image ? (
                    <img className="rounded-full w-32 h-32 object-cover" src={image} alt={`${name}'s profile picture`} />
                ) : (<div className="w-32 h-32 rounded-full flex items-center justify-center border">
                    <svg className="svg-icon w-1/2 h-auto" viewBox="0 0 20 20">
                        <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                    </svg>
                </div>
                )}
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 text-center md:text-left">{name}</h5>
                <p className="text-sm text-gray-500 text-center md:text-left">{summary}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <a href={`https://www.${crunchbaseUri}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                        Crunchbase
                    </a>
                    <a href={`https://www.${linkedInUri}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                        LinkedIn
                    </a>
                </div>
                {emailAddresses && emailAddresses.length > 0 && (<>
                    <p className="text-gray-700 dark:text-gray-400 mt-2 text-center">Contact Info</p>
                    <ul>
                        {emailAddresses?.map((e, i) => (
                            <li key={i}>{e.contactString}</li>
                        ))}
                    </ul>
                </>)}
            </div>

            {/* Description & Actions */}
            <div className="flex flex-col md:w-2/3 justify-between">
                {description &&
                    <div>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">About</h5>
                        <p className="text-gray-700 text-base line-clamp-3 md:line-clamp-none">
                            {isExpanded || description.length < 350 ? description : `${description.substring(0, 347)}... `}
                            {description.length >= 350 && (
                                <button onClick={() => setIsExpanded(!isExpanded)} className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                                    {isExpanded ? 'Read Less' : 'Read More'}
                                </button>
                            )}
                        </p>
                    </div>
                }
                <div className="flex justify-end space-x-2 mt-4">
                    <a href={`/linkedin/${_id}`} target="_blank" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                        Write LinkedIn Message
                    </a>
                    <a href={`/email/${_id}`} target="_blank" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
                        Write Email
                    </a>
                </div>
            </div>
        </div>
    );
}
