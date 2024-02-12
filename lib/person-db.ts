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

        console.log(id)

        console.log(`data to update profile with: ${JSON.stringify(data)}`)

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

        const objectId = stringToObjectId(id)

        // Check if a subscription already exists for this userId
        const person = await PersonModel.findById(objectId);

        if (person) {
            transformProps(person, castToString, '_id');
            transformProps(person, dateToString, ["createdAt", "updatedAt"]);
            //console.log(subscription)
            return {
                person,
            };
        } else {
            return { error: "Post not found" };
        }
    } catch (error) {
        console.log(error)
        return { error };
    }
}

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

export async function getPeople(filter: { page: number, limit: number }) {
    try {
        await connectDB();

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 10;
        const skip = (page - 1) * limit;

        //console.log(page, limit)

        const people = await PersonModel.find({}).sort('-createdAt').skip(skip).limit(limit).lean().exec();

        const results = people.length;

        if (people) {
            transformProps(people, castToString, '_id');
            transformProps(people, dateToString, ["createdAt", "updatedAt"]);
            //console.log(jobs)
            return {
                people,
                page,
                limit,
                results,
            };
        } else {
            return { error: "Jobs not found" };
        }
    } catch (error) {
        return { error };
    }
}