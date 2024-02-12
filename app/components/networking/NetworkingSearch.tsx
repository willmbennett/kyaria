'use client'
import React, { useState } from 'react';
import { PersonClass } from '../../../models/Person';
import PersonCard from './PersonCard';
import { ResumeClass } from '../../../models/Resume';
import { Button } from '../Button';
import { NetworkingResults } from './NetworkingResults';
import ResumeDropdownMenu from './ResumeDropdownMenu';
import Link from 'next/link';

interface ResumeSearchProps {
    resumes: ResumeClass[]
}

function extractResumeText(obj: any, parentKey = '') {
    let text = '';

    // Define keys to exclude from text extraction
    const excludeKeys = ['_id', 'resumeScan', 'createdAt', 'updatedAt', 'email', 'phone', 'social_links', 'userId'];

    // Check if the current object is directly a string and not in the excluded keys
    if (typeof obj === 'string' && !excludeKeys.includes(parentKey)) {
        return obj + ' ';
    }

    // If the object is an array, iterate over it
    if (Array.isArray(obj)) {
        obj.forEach(item => {
            text += extractResumeText(item);
        });
    }
    // If the object is an object, iterate over its keys
    else if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => {
            // Skip over excluded keys
            if (!excludeKeys.includes(key)) {
                // Special handling for the location to include it
                if (key === 'location') {
                    text += obj[key] + ' ';
                } else {
                    // Recursively process the current key
                    text += extractResumeText(obj[key], key);
                }
            }
        });
    }

    return text;
}


const NetworkingSearch = ({ resumes }: ResumeSearchProps) => {
    const [query, setQuery] = useState('');
    const [useResume, setUseResume] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [embeddings, setEmbeddings] = useState<number[]>([]);
    const [selectedResumeId, setSelectedResumeId] = useState<string>(resumes[0]._id.toString() || '');

    // Find the selected resume based on the selectedResumeId
    const selectedResume = resumes.find(resume => resume._id === selectedResumeId);
    const resumeText = extractResumeText(selectedResume)
    const userQuery = useResume ? query + ' ' + resumeText : query


    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/openai/semanticsearch/embeddings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: userQuery }),
            });

            if (response.ok) {
                const embedding = await response.json();
                setEmbeddings(embedding); // Store embeddings for potential future use
                setIsLoading(false);
                // Optionally, trigger navigation or state update to show results component
            } else {
                console.error('Failed to fetch embeddings:', response.statusText);
                alert('Failed to fetch embeddings. Please try again.');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            alert('An error occurred while fetching embeddings. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <div className='flex flex-col w-full space-y-4 pb-10'>
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">Select which resume to use</h2>
                <p>This resume will be used to generate personalized emails, linkedin connection request messages, and can help refine your search results.</p>
                {resumes.length > 0 ?
                    <div className="mt-10 flex flex-col sm:flex-row sm:space-x-5 md:mt-12 md:justify-center items-center xl:justify-start">
                        <ResumeDropdownMenu
                            selectedResumeId={selectedResumeId}
                            setSelectedResumeId={setSelectedResumeId}
                            resumes={resumes}
                        />
                        {selectedResume && (
                            <Link href={`/resumebuilder/${selectedResume._id.toString()}`} target="_blank">
                                View Selected Resume
                            </Link>
                        )}
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                id="refineSearchWithResume"
                                name="refineSearchWithResume"
                                onChange={(e) => setUseResume(e.target.checked)}
                            />
                            <span className="text-sm text-gray-600">Refine search with my resume</span>
                        </label>
                    </div>
                    :
                    <div>
                        <Button size='md' href='/resumebuilder/new' >Add a New Resume</Button>
                    </div>
                }
                {selectedResume &&
                    <>
                        <h2 className="text-2xl font-semibold leading-tight text-slate-900">Add your networking goal</h2>
                        <p>Your goal will be used to find the best people to network with.</p>
                        <div className="mt-10 flex flex-col sm:flex-row sm:space-x-5 md:mt-12 md:justify-center xl:justify-start">

                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="I'd like to find a job as a software engineer at Google..."
                                className="input input-bordered input-primary w-full"
                            />
                            <Button onClick={handleSearch} disabled={isLoading || !selectedResumeId}>
                                Search
                            </Button>
                        </div>
                    </>
                }

                {isLoading && <p className="text-gray-700 dark:text-gray-400 mt-2 text-start">Searching...</p>}
                {!isLoading && embeddings.length > 0 && selectedResume && <NetworkingResults embeddings={embeddings} userResume={selectedResume} />}
            </div>
        </>
    );
};

export default NetworkingSearch;


