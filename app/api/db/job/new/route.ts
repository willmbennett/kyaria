import clientPromise from "../../../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";


export async function POST(request: Request) {
    const formData = await request.json()

    const userId = formData.userId
    //console.log(userId)
    const userIdObject = new ObjectId(userId);

    //console.log(userIdObject)

    delete formData.userId;

    // Add back in the correctly formatted object ID
    const docWithObject = { ...formData, userId: userIdObject }

    //console.log(docWithObject)

    try {
        const client = await clientPromise;
        const userProfile = await client.db("test")
            .collection("jobs")
            .insertOne(docWithObject)

        
            //console.log(userProfile)
        return NextResponse.json(userProfile);
    } catch (e) {
        console.error(e);
    }
};