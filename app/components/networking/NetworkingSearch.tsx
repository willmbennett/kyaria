'use client'
import React, { useEffect, useState } from 'react';
import { ResumeClass } from '../../../models/Resume';
import { Button } from '../Button';
import { NetworkingResults } from './NetworkingResults';
import ResumeDropdownMenu from './ResumeDropdownMenu';
import Link from 'next/link';
import { employerFuzzyMatchingAction, institutionFuzzyMatchingAction } from '../../networking/_action';
import { usePathname } from 'next/navigation';
import { useEntitySearch } from '../../../lib/hooks/use-entity-search';
import { extractResumeText } from '../../networking/networking-helper';
import EntityFilter from './filter/EntityFilter';
import Collapsible from './filter/Collapsible';

interface ResumeSearchProps {
    resumes: ResumeClass[]
}


const NetworkingSearch = ({ resumes }: ResumeSearchProps) => {
    const path = usePathname()
    const [query, setQuery] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [batchFrequency, setBatchFrequency] = useState('');
    const [showCampaign, setShowCampaign] = useState(false);
    const [useResume, setUseResume] = useState(false);
    const [isCurrentEmployment, setIsCurrentEmployment] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [embeddings, setEmbeddings] = useState<number[]>([]);
    const [selectedResumeId, setSelectedResumeId] = useState<string>(resumes[0]._id.toString() || '');

    // Find the selected resume based on the selectedResumeId
    const selectedResume = resumes.find(resume => resume._id === selectedResumeId);
    const resumeText = extractResumeText(selectedResume)
    const userQuery = useResume ? query + ' ' + resumeText : query

    const institutionSearchAction = (query: string) => institutionFuzzyMatchingAction(query, path);
    const {
        query: institutionQuery,
        setQuery: setInstitutionQuery,
        isLoading: isSearchingInstitutions,
        visibleResults: visibleInstitutionResults,
        selected: selectedInstitutions,
        selectEntity: selectInstitution,
        removeSelectedEntity: removeSelectedInstitution,
        debouncedSearch: debouncedInstitutionSearch,
    } = useEntitySearch(institutionSearchAction);

    useEffect(() => {
        debouncedInstitutionSearch();
    }, [debouncedInstitutionSearch]);

    const employerSearchAction = (query: string) => employerFuzzyMatchingAction(query, path);
    const {
        query: employerQuery,
        setQuery: setEmployerQuery,
        isLoading: isSearchingEmployers,
        visibleResults: visibleEmployerResults,
        selected: selectedEmployers,
        selectEntity: selectEmployer,
        removeSelectedEntity: removeSelectdEmployer,
        debouncedSearch: debouncedEmployerSearch,
    } = useEntitySearch(employerSearchAction);

    useEffect(() => {
        debouncedEmployerSearch();
    }, [debouncedEmployerSearch]);


    const handleSearch = async () => {
        setIsLoading(true);
        setIsSearching(true)
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


    const handleCancel = () => {
        setIsSearching(false)
    }

    return (
        <>
            <div className={`flex flex-col w-full space-y-10 pb-10 ${!isSearching && !isLoading ? 'visible' : 'invisible h-0'}`}>
                <Collapsible title="Resume Selection">
                    <p>Select which resume you want to use for your campaign.</p>
                    {resumes.length > 0 ?
                        <div className="mt-5 flex flex-col sm:flex-row sm:space-x-5 md:justify-center items-center xl:justify-start">
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
                </Collapsible>
                <div className='flex flex-col'>
                    <Collapsible title="Filters">
                        <p>Filter by School, Institution, or any additional information.</p>
                        <>
                            <Collapsible title="Filter by School">
                                <EntityFilter
                                    query={institutionQuery}
                                    setQuery={setInstitutionQuery}
                                    results={visibleInstitutionResults}
                                    selectedEntities={selectedInstitutions}
                                    selectEntity={selectInstitution}
                                    removeSelectedEntity={removeSelectedInstitution}
                                    placeholder="Search for schools..."
                                />
                            </Collapsible>

                            <Collapsible title="Filter by Company">
                                <div className='flex flex-col item-center space-y-4'>
                                    <EntityFilter
                                        query={employerQuery}
                                        setQuery={setEmployerQuery}
                                        results={visibleEmployerResults}
                                        selectedEntities={selectedEmployers}
                                        selectEntity={selectEmployer}
                                        removeSelectedEntity={removeSelectdEmployer}
                                        placeholder="Search for companies..."
                                    />
                                    {selectedEmployers.length > 0 &&
                                        <label className="flex items-start space-x-3">
                                            <input
                                                type="checkbox"
                                                className="isCurrentEmployment-checkbox"
                                                id="isCurrentEmployment"
                                                name="isCurrentEmployment"
                                                onChange={(e) => setIsCurrentEmployment(e.target.checked)}
                                            />
                                            <span className="text-sm text-gray-600">Is current?</span>
                                        </label>
                                    }
                                </div>
                            </Collapsible>
                        </>
                    </Collapsible>
                </div>


                {selectedResume &&
                    <>
                        <Collapsible title="Additional Information">
                            <div>
                                <h2 className="text-2xl font-semibold leading-tight text-slate-900"></h2>
                                <p>Add any other information you want to search with.</p>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="I'd like to find a job as a software engineer at Google..."
                                    className="input input-bordered input-primary w-full"
                                />
                            </div>
                        </Collapsible>
                    </>
                }
                <div>
                    {!isLoading && selectedResumeId && userQuery != '' &&
                        <Button onClick={handleSearch} disabled={!selectedResumeId || userQuery === ''}>
                            Search
                        </Button>
                    }
                </div>
            </div>
            {selectedResume && embeddings.length > 0 &&
                <div className={`w-full pb-10 transition-opacity duration-500 ${isSearching ? 'opacity-100' : 'opacity-0'}`}>
                    <Button size='sm' variant='ghost' onClick={handleCancel}>← Back to Search</Button>
                    <NetworkingResults
                        embeddings={embeddings}
                        userResume={selectedResume}
                        selectedInstitutions={selectedInstitutions}
                        selectedEmployers={selectedEmployers}
                        isCurrentEmployment={isCurrentEmployment}
                    />
                </div>
            }
        </>
    );
};

export default NetworkingSearch;


