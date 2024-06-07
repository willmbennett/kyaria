import { NextResponse } from 'next/server'
import { checkDiffbotIdAction, createPersonAction } from '../../../admin/_action';
import { extractPersonTextForEmbedding } from '../../../networking/networking-helper';
import { PersonClass } from '../../../../models/Person';
import { auth } from '../../../../auth';

const logging = false

export async function POST(request: Request) {
    const { limit, importance } = await request.json()

    const session = await auth()

    const sizeLimit = limit || 1

    if (!importance) {
        return NextResponse.json({ error: 'No importance set.' }, { status: 400 });
    }

    if (!session) {
        return NextResponse.json({ error: 'no session.' }, { status: 400 });
    }

    try {

        //console.log(orgId)

        //https://kg.diffbot.com/kg/v3/dql?type=query&token=370f92ac1e272c3a138023799b72ccc0&query=type%3APerson+employments.{categories.name%3Aor(%22Management%22%2C%20%22Human%20Resources%20and%20Recruiting%22)%20isCurrent%3Atrue%20categories.name:%22Engineering%2C%20IT%20and%20Software%20Development%22}+location.isCurrent%3Atrue+location.country.diffbotUri%3A%22http%3A%2F%2Fdiffbot.com%2Fentity%2FE01d4EK33MmCosgI2KXa4-A%22+revSortBy%3Aimportance&size=1

        const apiUrl = `https://kg.diffbot.com/kg/v3/dql?type=query&token=${process.env.DIFFBOT_API_KEY}&query=type%3APerson+employments.{categories.name%3Aor(%22Management%22%2C%20%22Human%20Resources%20and%20Recruiting%22)%20isCurrent%3Atrue%20categories.name:%22Engineering%2C%20IT%20and%20Software%20Development%22}+location.isCurrent%3Atrue+importance<${importance}+location.country.diffbotUri%3A%22http%3A%2F%2Fdiffbot.com%2Fentity%2FE01d4EK33MmCosgI2KXa4-A%22+revSortBy%3Aimportance&size=${sizeLimit}`

        if (logging) console.log(apiUrl)


        const options = {
            method: 'GET',
            headers: { accept: 'application/json' },
        };

        const fetchResponse = await fetch(apiUrl, options);

        if (!fetchResponse.ok) {
            if (logging) console.log(fetchResponse)
            return NextResponse.json({ error: 'Failed to fetch data from the Diffbot API.' }, { status: fetchResponse.status });
        }

        const { data } = await fetchResponse.json();

        //console.log('======= Fetrched Data (=======')
        //console.log(data)


        const people = data.map((data: any) => data.entity)

        let savedIds = []; // To store IDs or some identifier of saved persons

        //const people = PersonDummyData.data.map(data => data.entity)

        // Track progress
        let processedCount = 0;
        const totalToProcess = people.length

        // Assuming data is an array of person entities
        for (let person of people) {
            if (logging) console.log(`Processing ${processedCount} out of ${totalToProcess}`)
            if (logging) console.log(`Processing person ${person.name || person.id} with importance ${person.importance}...`);

            const diffbotId = person.id

            const existingPerson = await checkDiffbotIdAction(diffbotId, '/admin')

            if (existingPerson) {
                if (logging) console.log(`Person ${person.name || diffbotId} already exists. Skipping.`);
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
            if (logging) console.log(`Creating person ${person.name || diffbotId} in the database...`);
            const personId = await createPersonAction(newPerson, '/admin');
            savedIds.push(personId);

            if (logging) console.log(`Successfully saved person ${person.name || diffbotId} with ID: ${personId}`);


            // Update processed count
            processedCount++;
        }

        //const data = ''
        if (logging) console.log(`Successfully processed ${processedCount} people`);
        return NextResponse.json(processedCount, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
