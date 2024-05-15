'use client'
import { useState } from 'react';
import { checkEmployerDiffbotIdAction, checkInstitutionDiffbotIdAction, createEmployerAction, createInstitutionAction, getPeopleAction } from '../../admin/_action';

const logging = true

export const PersonPage = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>();

  const fetchEmployees = async () => {
    setLoading('Fetching employees');
    try {

      const filter = { limit: 5000, importance: 86.8268814086914 }
      if (logging) console.log(filter)
      const response = await fetch('/api/diffbot/employees', {
        method: 'POST',
        body: JSON.stringify(filter)
      });


      if (!response.ok) {
        throw new Error('Failed to scrape people');
      }

      const { processedCount } = await response.json();


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
    if (logging) console.log(`Starting to create employers from ${skipEmployees} employees out of ${numEmployees} in batches of ${batchSize}`);

    for (let j = skipEmployees; j < numEmployees; j += batchSize) {

      let employersMap = new Map(); // Use a Map to store unique employers

      for (let i = 0; i < batchSize; i++) {
        if (logging) console.log(`Processing batch starting at employee ${j + i}`);
        const filter = { skip: j, limit: 1 };
        const people = await getPeopleAction(filter, '/admin');

        if (!Array.isArray(people)) {
          if (logging) console.log(`Expected an array of people, received: ${typeof people}. Skipping batch.`);
          continue;
        }

        if (logging) console.log(`Retrieved ${people.length} people in current batch.`);
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
        if (logging) console.log(`Processing employer with targetDiffbotId: ${employer.targetDiffbotId}`);
        const employerExists = await checkEmployerDiffbotIdAction(employer.targetDiffbotId, '/admin');
        if (!employerExists) {
          if (logging) console.log(`Creating new employer with targetDiffbotId: ${employer.targetDiffbotId}`);
          const employerId = await createEmployerAction(employer, '/admin'); // Pass the entire employer object
          if (employerId) console.log(`Created new employer: `, employerId);
        } else {
          if (logging) console.log(`Employer with targetDiffbotId: ${employer.targetDiffbotId} already exists. Skipping creation.`);
        }
      });

      await Promise.all(employerCreationPromises);
      if (logging) console.log(`Completed creating employers for all ${batchSize} employees.`);
    }
  };


  const createInstitutions = async () => {
    //const numEmployees = 7982; // Number of employees currently
    const numEmployees = 1000; // Number of employees currently
    const skipEmployees = 100; // Number of employees to skip, set this up as of 2/14
    const batchSize = 10
    if (logging) console.log(`Starting to create institution from ${skipEmployees} employees out of ${numEmployees} in batches of ${batchSize}`);

    for (let j = skipEmployees; j < numEmployees; j += batchSize) {

      let institutionsMap = new Map(); // Use a Map to store unique employers

      for (let i = 0; i < batchSize; i++) {
        if (logging) console.log(`Processing batch starting at employee ${j + i}`);
        const filter = { skip: j, limit: 1 };
        const people = await getPeopleAction(filter, '/admin');

        if (!Array.isArray(people)) {
          if (logging) console.log(`Expected an array of people, received: ${typeof people}. Skipping batch.`);
          continue;
        }

        if (logging) console.log(`Retrieved ${people.length} people in current batch.`);
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
        if (logging) console.log(`Processing instution with targetDiffbotId: ${institution.targetDiffbotId}`);
        const instutionExists = await checkInstitutionDiffbotIdAction(institution.targetDiffbotId, '/admin');
        if (!instutionExists) {
          if (logging) console.log(`Creating new instution with targetDiffbotId: ${institution.targetDiffbotId}`);
          const instutionId = await createInstitutionAction(institution, '/admin'); // Pass the entire employer object
          if (instutionId) console.log(`Created new instutution: `, instutionId);
        } else {
          if (logging) console.log(`Instution with targetDiffbotId: ${institution.targetDiffbotId} already exists. Skipping creation.`);
        }
      });

      await Promise.all(employerCreationPromises);
      if (logging) console.log(`Completed creating instutions for all ${batchSize} employees.`);
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
              <button onClick={fetchEmployees} disabled={false} className="px-4 py-2 my-2 bg-red-500 text-white rounded hover:bg-red-600">
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
