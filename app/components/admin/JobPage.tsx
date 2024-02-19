'use client'
import { useState } from 'react';

export const JobPage = () => {
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

    return (
        <div className="flex mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <div className="flex flex-1 flex-col items-center text-center lg:px-4">
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
                    </div>
                )}
                {response && (
                    <p className="mb-4 text-gray-700">{response}</p>
                )}
            </div>
        </div>
    );
}
