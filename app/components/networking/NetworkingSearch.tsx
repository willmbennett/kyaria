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

    const [building, setBuilding] = useState(true)

    const handleBuild = () => {
        setBuilding(true);
        setShowCampaign(true)
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setBuilding(false);
        }, 40000); // Simulate building for 20 seconds
        return () => clearTimeout(timer);
    }, [building]);


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
                        <Collapsible title="Set Schedule">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold leading-tight text-slate-900">Networking Campaign Schedule</h2>
                                <p>Set how you want your networking campaign to run.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="numberPeople" className="block mb-2 text-sm font-medium text-gray-900">Number of people per batch</label>
                                        <input
                                            type="number"
                                            id="numberPeople"
                                            value={numberOfPeople}
                                            onChange={(e) => setNumberOfPeople(e.target.value)}
                                            placeholder="e.g., 10"
                                            className="input input-bordered input-primary w-full"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="batchFrequency" className="block mb-2 text-sm font-medium text-gray-900">Frequency of batches</label>
                                        <select
                                            id="batchFrequency"
                                            value={batchFrequency}
                                            onChange={(e) => setBatchFrequency(e.target.value)}
                                            className="select select-bordered select-primary w-full"
                                        >
                                            <option value="">Select frequency</option>
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="biweekly">Biweekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Collapsible>

                    </>
                }
                <div>
                    {!isLoading && selectedResumeId && userQuery != '' && numberOfPeople && batchFrequency &&
                        <Button onClick={handleBuild} disabled={!selectedResumeId || userQuery === ''}>
                            Create Campaign
                        </Button>
                    }
                </div>
            </div>
            {showCampaign &&
                <div className="overflow-x-auto w-full">
                    <h2 className="text-2xl font-semibold text-center text-slate-900 pb-2">Campaign 1</h2>
                    <table className="table-auto w-full bg-gray-50">
                        <thead className="text-xs font-semibold uppercase text-gray-400">
                            <tr>
                                <th className="py-3 px-2">Num People</th>
                                <th className="py-3 px-2">Frequency</th>
                                <th className="py-3 px-2">Companies</th>
                                <th className="py-3 px-2">Institutions</th>
                                <th className="py-3 px-2">Additional Information</th>
                                <th className="py-3 px-2">Resume Selected</th>
                                <th className="py-3 px-2">State</th>
                                <th className="py-3 px-2">Link to Campaign</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-center divide-y divide-gray-100">
                            <tr key={1}>
                                <td className="py-3 px-2">{numberOfPeople}</td>
                                <td className="py-3 px-2">{batchFrequency}</td>
                                <td className="py-3 px-2">{selectedEmployers.map(i => i.name).join(", ")}</td>
                                <td className="py-3 px-2">{selectedInstitutions.map(i => i.name).join(", ")}</td>
                                <td className="py-3 px-2">{query}</td>
                                <td className="py-3 px-2">1 - {selectedResume?.name}</td>
                                <th className="py-3 px-2 text-center">
                                    {building ? (
                                        <div className="inline-flex items-center bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
                                            <svg className="w-4 h-4 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M4 3H16V5H4V3M4 7H16V17H4V7M2 5V19C2 19.55 2.45 20 3 20H17C17.55 20 18 19.55 18 19V5C18 4.45 17.55 4 17 4H3C2.45 4 2 4.45 2 5Z" />
                                            </svg>
                                            Building
                                        </div>
                                    ) : (
                                        <div className="inline-flex items-center bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                                            <svg className="w-4 h-4 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M10 15L5 10H7.5L10 12.5L14.5 8H17L10 15Z" />
                                            </svg>
                                            Sent
                                        </div>
                                    )}
                                </th>
                                <td className="py-3 px-2">
                                    <Button size='sm' variant='ghost' onClick={handleSearch} disabled={isLoading || !selectedResumeId || userQuery === ''}>
                                        View Campaign
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            {selectedResume && embeddings.length > 0 &&
                <div className={`w-full pb-10 transition-opacity duration-500 ${isSearching ? 'opacity-100' : 'opacity-0'}`}>
                    <Button size='sm' variant='ghost' onClick={handleCancel}>← Change campaign</Button>
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


