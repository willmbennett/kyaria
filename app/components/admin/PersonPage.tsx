'use client'
import { useState } from 'react';
import PersonDummyData from '../../networking/person.json';
import { PersonClass } from '../../../models/Person';
import { checkDiffbotIdAction, checkEmployerDiffbotIdAction, checkInstitutionDiffbotIdAction, createEmployerAction, createInstitutionAction, createPersonAction, getEmployerAction, getPeopleAction, updatePersonAction } from '../../admin/_action';
import { extractPersonTextForEmbedding } from '../../networking/networking-helper';

export const PersonPage = () => {
    const [loading, setLoading] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>();

    const fetchEmployees = async () => {
        setLoading('Fetching employees');
        try {

            const filter = { limit: 1000, skip: 7000 }
          //console.log(filter)
            const response = await fetch('/api/diffbot/employees', {
                method: 'POST',
                body: JSON.stringify(filter)
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
            const totalToProcess = people.length

            // Assuming data is an array of person entities
            for (let person of people) {
              //console.log(`Processing ${processedCount} out of ${totalToProcess}`)
              //console.log(`Processing person ${person.name || person.id}...`);

                const diffbotId = person.id

                const existingPerson = await checkDiffbotIdAction(diffbotId, '/admin')

                if (existingPerson) {
                  //console.log(`Person ${person.name || diffbotId} already exists. Skipping.`);
                    continue; // Skip this person and continue with the next one
                }

                // Start by extracting text for embeddings
                const embeddingsText = extractPersonTextForEmbedding(person);
              //console.log(`Extracted embeddings text for person ${person.name || person.id}.`);

                const newPerson: Partial<PersonClass> = {
                    ...person,
                    diffbotId: diffbotId, // Assuming the custom ID is coming in person.id
                    embeddingsText,
                };
                delete (newPerson as any).id;

                // Assuming createPersonAction takes a single person object and returns an ID or some identifier
              //console.log(`Creating person ${person.name || diffbotId} in the database...`);
                const personId = await createPersonAction(newPerson, '/admin');
                savedIds.push(personId);

              //console.log(`Successfully saved person ${person.name || diffbotId} with ID: ${personId}`);


                // Update processed count
                processedCount++;
            }

            setResponse(`Employees Fetched: ${processedCount}`);
        } catch (error) {
            console.error('Error updating recommendation system:', error);
        } finally {
            setLoading(null);
        }
    };

    const createEmployers = async () => {
        const numEmployees = 7982; // Number of employees currently
        const skipEmployees = 2181; // Number of employees to skip, set this up as of 2/14
        const batchSize = 10
      //console.log(`Starting to create employers from ${skipEmployees} employees out of ${numEmployees} in batches of ${batchSize}`);

        for (let j = skipEmployees; j < numEmployees; j += batchSize) {

            let employersMap = new Map(); // Use a Map to store unique employers

            for (let i = 0; i < batchSize; i++) {
              //console.log(`Processing batch starting at employee ${j + i}`);
                const filter = { skip: j, limit: 1 };
                const people = await getPeopleAction(filter, '/admin');

                if (!Array.isArray(people)) {
                  //console.log(`Expected an array of people, received: ${typeof people}. Skipping batch.`);
                    continue;
                }

              //console.log(`Retrieved ${people.length} people in current batch.`);
                people.forEach(person => {
                    person.employments?.forEach(employment => {
                        if (employment.employer && employment.employer.targetDiffbotId) {
                            employersMap.set(employment.employer.targetDiffbotId, employment.employer);
                        }
                    });
                });
            }

            const uniqueEmployers = Array.from(employersMap.values());

            const employerCreationPromises = uniqueEmployers.map(async (employer) => {
              //console.log(`Processing employer with targetDiffbotId: ${employer.targetDiffbotId}`);
                const employerExists = await checkEmployerDiffbotIdAction(employer.targetDiffbotId, '/admin');
                if (!employerExists) {
                  //console.log(`Creating new employer with targetDiffbotId: ${employer.targetDiffbotId}`);
                    const employerId = await createEmployerAction(employer, '/admin'); // Pass the entire employer object
                    if (employerId) console.log(`Created new employer: `, employerId);
                } else {
                  //console.log(`Employer with targetDiffbotId: ${employer.targetDiffbotId} already exists. Skipping creation.`);
                }
            });

            await Promise.all(employerCreationPromises);
          //console.log(`Completed creating employers for all ${batchSize} employees.`);
        }
    };


    const createInstitutions = async () => {
        //const numEmployees = 7982; // Number of employees currently
        const numEmployees = 1000; // Number of employees currently
        const skipEmployees = 100; // Number of employees to skip, set this up as of 2/14
        const batchSize = 10
      //console.log(`Starting to create institution from ${skipEmployees} employees out of ${numEmployees} in batches of ${batchSize}`);

        for (let j = skipEmployees; j < numEmployees; j += batchSize) {

            let institutionsMap = new Map(); // Use a Map to store unique employers

            for (let i = 0; i < batchSize; i++) {
              //console.log(`Processing batch starting at employee ${j + i}`);
                const filter = { skip: j, limit: 1 };
                const people = await getPeopleAction(filter, '/admin');

                if (!Array.isArray(people)) {
                  //console.log(`Expected an array of people, received: ${typeof people}. Skipping batch.`);
                    continue;
                }

              //console.log(`Retrieved ${people.length} people in current batch.`);
                people.forEach(person => {
                    person.educations?.forEach(eduction => {
                        if (eduction.institution && eduction.institution.targetDiffbotId) {
                            institutionsMap.set(eduction.institution.targetDiffbotId, eduction.institution);
                        }
                    });
                });
            }

            const uniqueInstitutions = Array.from(institutionsMap.values());

            const employerCreationPromises = uniqueInstitutions.map(async (institution) => {
              //console.log(`Processing instution with targetDiffbotId: ${institution.targetDiffbotId}`);
                const instutionExists = await checkInstitutionDiffbotIdAction(institution.targetDiffbotId, '/admin');
                if (!instutionExists) {
                  //console.log(`Creating new instution with targetDiffbotId: ${institution.targetDiffbotId}`);
                    const instutionId = await createInstitutionAction(institution, '/admin'); // Pass the entire employer object
                    if (instutionId) console.log(`Created new instutution: `, instutionId);
                } else {
                  //console.log(`Instution with targetDiffbotId: ${institution.targetDiffbotId} already exists. Skipping creation.`);
                }
            });

            await Promise.all(employerCreationPromises);
          //console.log(`Completed creating instutions for all ${batchSize} employees.`);
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
                            <p className="mb-4 text-gray-700">Employee fetching</p>
                            <button onClick={fetchEmployees} disabled={true} className="px-4 py-2 my-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Fetch Employees
                            </button>
                            <button onClick={createEmployers} className="px-4 py-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Create Employers
                            </button>
                            <button onClick={createInstitutions} className="px-4 py-2 my-2 bg-green-500 text-white rounded hover:bg-green-600">
                                Create Institutions
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
