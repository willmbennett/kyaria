'use client'
import { useState } from 'react';
import PersonDummyData from '../../networking/person.json';
import { PersonClass } from '../../../models/Person';
import { createPersonAction, updatePersonAction } from '../../admin/_action';
import { extractPersonTextForEmbedding } from '../../networking/networking-helper';

export const MainPage = () => {
    const [loading, setLoading] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>();

    const updateJobRecs = async () => {
        setLoading('Updating Job Recs...');
        try {
            const response = await fetch('/api/db/userjobrecs', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to update job recommendations');
            }

            const data = await response.json();
            setResponse(`Job recommendations updated: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error('Error updating job recommendations:', error);
        } finally {
            setLoading(null);
        }
    };

    const updateRecommendationSystem = async () => {
        setLoading('Updating Recommendation System...');
        try {
            const response = await fetch('/api/db/jobrecs', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to update recommendation system');
            }

            const data = await response.json();
            setResponse(`Job recommendations updated: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error('Error updating recommendation system:', error);
        } finally {
            setLoading(null);
        }
    };

    const scrapeJobs = async () => {
        setLoading('Scraping in jobs...');
        try {
            const response = await fetch('/api/db/indeedscraper', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to scrape jobs');
            }

            const data = await response.json();
            setResponse(`Job recommendations updated: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error('Error updating recommendation system:', error);
        } finally {
            setLoading(null);
        }
    };

    const fetchEmployees = async () => {
        setLoading('Fetching employees');
        try {
            const response = await fetch('/api/diffbot/employees', {
                method: 'POST',
                body: JSON.stringify({ limit: 800, skip: 200 })
            });


            if (!response.ok) {
                throw new Error('Failed to scrape jobs');
            }

            const data = await response.json();

            const people = data.map((data: any) => data.entity)

            let savedIds = []; // To store IDs or some identifier of saved persons

            //const people = PersonDummyData.data.map(data => data.entity)

            // Track progress
            let processedCount = 0;

            // Assuming data is an array of person entities
            for (let person of people) {
                console.log(`Processing person ${person.name || person.id}...`);

                // Start by extracting text for embeddings
                const embeddingsText = extractPersonTextForEmbedding(person);
                console.log(`Extracted embeddings text for person ${person.name || person.id}.`);

                const newPerson: Partial<PersonClass> = {
                    ...person,
                    diffbotId: person.id, // Assuming the custom ID is coming in person.id
                    embeddingsText,
                };
                delete (newPerson as any).id;

                // Assuming createPersonAction takes a single person object and returns an ID or some identifier
                console.log(`Creating person ${person.name || person.id} in the database...`);
                const personId = await createPersonAction(newPerson, '/admin');
                savedIds.push(personId);

                console.log(`Successfully saved person ${person.name || person.id} with ID: ${personId}`);

                // Update processed count
                processedCount++;
            }

            setResponse(`Employees Fetched: ${savedIds}`);
        } catch (error) {
            console.error('Error updating recommendation system:', error);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <div className="flex flex-1 w-full flex-col items-center text-center lg:px-4">
                {loading ? (
                    <p className="mb-4 text-gray-700">{loading}</p>
                ) : (
                    <div className='flex flex-row space-x-10'>
                        <div className='flex flex-col'>
                            <p className="mb-4 text-gray-700">Recommendation system</p>
                            <button onClick={updateJobRecs} className="mb-4 px-4 py-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                1 - Update Job Recs
                            </button>
                            <button onClick={updateRecommendationSystem} className="px-4 py-2 my-2 bg-green-500 text-white rounded hover:bg-green-600">
                                2 - Update Recommendation System
                            </button>
                            <button onClick={scrapeJobs} className="px-4 py-2 my-2 bg-red-500 text-white rounded hover:bg-red-600">
                                3 - Scrape in jobs
                            </button>
                        </div>
                        <div className='flex flex-col'>
                            <p className="mb-4 text-gray-700">Employee fetching</p>
                            <button onClick={fetchEmployees} className="px-4 py-2 my-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Fetch Employees
                            </button>
                        </div>
                    </div>
                )}
                {response && (
                    <p className="mb-4 text-gray-700">{response}</p>
                )}
            </div>
        </div>
    );
}
