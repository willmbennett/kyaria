import clientPromise from "../../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface updateType {
    [key: string]: string;
  }

export async function POST(request: Request) {
    const { collection, documentID, setKey, setVal} = await request.json()

    console.log(collection, documentID, setKey, setVal)
    const documentIdObject = new ObjectId(documentID);

    // If we need to search, search else don't
    console.log(`"${setKey}":"${setVal}"`)
    const inputValues = JSON.parse(`{"${setKey}":""}`)
    inputValues[setKey] = setVal
    console.log(`inputValues: ${JSON.stringify(inputValues)}`)

    try {
        const client = await clientPromise;
        const updatedValue = await client.db("test")
            .collection(collection)
            .updateOne({_id: documentIdObject},
                { $set: inputValues})
        
            //console.log(userProfile)
        return NextResponse.json(updatedValue);
    } catch (e) {
        console.error(e);
    }
};