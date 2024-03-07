import { PersonClass, PersonModel } from "../models/Person";
import connectDB from "./connect-db";
import { stringToObjectId, castToString, ObjectIdtoString, dateToString } from "./utils";
var transformProps = require('transform-props');

export async function createPerson(data: Partial<PersonClass>) {
    //console.log('Creating new post with data:', data); // Log entry with data

    try {
        await connectDB();
        //console.log('Database connection established');

        const newPerson = await PersonModel.create(data);

        if (newPerson) {
            //console.log('New person created successfully:', newPerson);

            const personId = castToString(newPerson._id);
            //console.log('Transformed newPersonId:', personId); // Log transformed postId

            return { personId };
        } else {
            console.error('Failed to create Person:', data); // Log failure case with data
            return { error: "Person not found" };
        }
    } catch (error) {
        console.error('Error in createPerson function:', error); // Log error with context
        return { error };
    }
}

export async function updatePerson(id: string, data: any) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

      //console.log(id)

      //console.log(`data to update profile with: ${JSON.stringify(data)}`)

        const profile = await PersonModel.findByIdAndUpdate(
            parsedId,
            data
        )
            .lean()
            .exec();

        if (profile) {
            return {
                profile,
            };
        } else {
            return { error: "Person not found" };
        }
    } catch (error) {
        return { error };
    }
}


export async function getPerson(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "id not included" };
        }

      //console.log(id)

        const objectId = stringToObjectId(id)

        // Check if a subscription already exists for this userId
        const person = await PersonModel.findById(objectId);

        //console.log('person:', person)

        if (person) {
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

            const personFound = {
                _id: castToString(_id),
                image,
                name,
                summary,
                crunchbaseUri,
                linkedInUri,
                emailAddresses,
                description
            }
            return {
                person: personFound
            };
        } else {
            return { error: "Post not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}

export async function getPersonText(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "id not included" };
        }

      //console.log(id)

        const objectId = stringToObjectId(id)

        // Check if a subscription already exists for this userId
        const person = await PersonModel.findById(objectId);


        if (person) {
            return {
                text: person.embeddingsText,
                name: person.name,
                emails: person.emailAddresses
            };
        } else {
            return { error: "Person not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}

export async function checkDiffbotId(diffbotId: string) {
    try {
        await connectDB();

        if (!diffbotId) {
            return { error: "diffbotId not included" };
        }

        //console.log(diffbotId)

        // Check if a subscription already exists for this userId
        const person = await PersonModel.find({ diffbotId: diffbotId }).lean().exec()

        //console.log(person)

        if (person.length > 0) {
          //console.log('person exists with diffbotId:', diffbotId)
            return {
                existingPerson: true,
            };
        } else {
            return { error: "Post not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}

/*
export async function fuzzymatching() {
    try {
        await connectDB();

      //console.log('made it here')

        // define pipeline
        const agg = [
            {
                $search: {
                    index: 'person_search',
                    autocomplete: {
                        query: 'goog',
                        path: "employments.employer.name",
                        fuzzy: {
                            maxEdits: 1,
                            prefixLength: 1,
                            maxExpansions: 256
                        },
                    },
                    "returnStoredSource": true
                },
            },
            { $limit: 10 }, // Adjust based on how many suggestions you want
            {
                $project: {
                    _id: 0,
                    employerNames: "$employments.employer.name",
                },
            },
        ];

      //console.log('agg: ', agg)

        // Check if a subscription already exists for this userId
        const employers = await PersonModel.aggregate(agg)
        // print results

        employers.forEach((doc) => console.log(doc));

        if (employers) {
            transformProps(employers, castToString, '_id');
            transformProps(employers, dateToString, ["createdAt", "updatedAt"]);
            //console.log(subscription)
            return {
                employers,
            };
        } else {
            return { error: "Post not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}
*/

export async function getPeopleTextExtraction(filter: { page: number, limit: number }) {
    try {
        await connectDB();

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 10;
        const skip = (page - 1) * limit;

        //console.log(page, limit)

        const people = await PersonModel.find({ "embeddingsText": null }).sort('-createdAt').skip(skip).limit(limit).lean().exec();

        //console.log(people)

        if (people) {
            transformProps(people, castToString, '_id');
            transformProps(people, dateToString, ["createdAt", "updatedAt"]);
            //console.log(people)
            return {
                people
            };
        } else {
            return { error: "People not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function getPeople(filter: { skip: number, limit: number }) {
    try {
        await connectDB();
        const limit = filter.limit ?? 10;
        const skip = filter.skip ?? 0

        //console.log(page, limit)

        const people = await PersonModel.find({}).sort('-createdAt').skip(skip).limit(limit).lean().exec();

        const results = people.length;

        if (people) {
            transformProps(people, castToString, '_id');
            transformProps(people, dateToString, ["createdAt", "updatedAt"]);
            //console.log(jobs)
            return {
                people,
                results,
            };
        } else {
            return { error: "Jobs not found" };
        }
    } catch (error) {
        return { error };
    }
}