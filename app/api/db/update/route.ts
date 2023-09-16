import clientPromise from "../../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface updateType {
    [key: string]: string;
  }

export async function POST(request: Request) {
    const { collection, documentID, updateRef, updateVal} = await request.json()

    console.log(collection, documentID, updateRef, updateVal)
    const documentIdObject = new ObjectId(documentID);

    const updateDoc: updateType = {}

    // Try to parse JSON
    try {
        updateDoc[updateRef] = JSON.parse(updateVal)
    }
    catch (e) { // If it fails just store the string
        updateDoc[updateRef] = updateVal
    }

    try {
        const client = await clientPromise;
        const updatedValue = await client.db("test")
            .collection(collection)
            .updateOne({_id: documentIdObject},
                { $set: updateDoc })

        
            //console.log(userProfile)
        return NextResponse.json(updatedValue);
    } catch (e) {
        console.error(e);
    }
};