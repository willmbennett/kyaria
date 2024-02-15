import React, { useState, useEffect } from 'react';
import PersonCard from './PersonCard';
import { ResumeClass } from '../../../models/Resume';
import { Button } from '../Button';
import { LoadingComponent } from './LoadingComponent';

type results = {
    targetDiffbotId: string;
    name: string
}

interface NetworkingResultsProps {
    embeddings: number[];
    userResume: ResumeClass;
    selectedInstitutions: results[];
    selectedEmployers: results[];
    isCurrentEmployment: boolean;
}

export const NetworkingResults = (
    {
        embeddings,
        userResume,
        selectedInstitutions,
        selectedEmployers,
        isCurrentEmployment
    }: NetworkingResultsProps) => {
    const itemsPerPage = 5
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (embeddings.length > 0) {
            fetchResults();
        }
    }, [currentPage, embeddings]); // Listen to currentPage changes    

    const fetchResults = async () => {
        setIsLoading(true);
        //console.log(embeddings)
        const skip = (currentPage - 1) * itemsPerPage
        //console.log(`about to fetch data, Current page: ${currentPage} ,Limit: ${itemsPerPage}, Skip: ${skip}`);
        try {
            const response = await fetch('/api/openai/semanticsearch/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    embeddings,
                    institutions: selectedInstitutions,
                    employers: selectedEmployers,
                    isCurrentEmployment,
                    skip,
                    limit: itemsPerPage
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data);
            } else {
                console.error('Failed to fetch results:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handlePageChange = (pageChange: number) => {
        setCurrentPage(currentPage => currentPage + pageChange);
    };

    // Render pagination controls
    const renderPaginationControls = () => {
        return (
            <div className="flex justify-between items-center my-4">
                <Button
                    size='sm'
                    variant={currentPage === 1 ? 'ghost' : 'solid'}
                    onClick={() => handlePageChange(-1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">Page {currentPage}</h2>
                <Button
                    size='sm'
                    onClick={() => handlePageChange(1)}
                >
                    Next
                </Button>
            </div>
        );
    };

    return (
        <div className="relative space-y-2 w-full">
            {renderPaginationControls()}
            <div className="w-full">
                <div className="flex flex-col space-y-2 w-full">
                    {isLoading ?
                        [1, 2, 3, 4, 5].map((p, i) => <LoadingComponent key={i} />)
                        :
                        results.length ?
                            results.map((person, index) => (
                                <PersonCard
                                    key={index}
                                    person={person}
                                    userResume={userResume}
                                />
                            ))
                            :
                            <p>No results found.</p>
                    }
                </div>
            </div>
        </div>
    );
};
