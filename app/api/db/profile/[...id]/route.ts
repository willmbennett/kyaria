import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, res: NextResponse) {
    const currentPath = request.nextUrl.pathname.toString()
    //console.log(currentPath)
    //console.log(currentPath.split("/"))
    const userID = currentPath.split("/").slice(-1).toString()
    //console.log(userID)

    try {
        const client = await clientPromise;
        const userProfile = await client.db("test")
            .collection("profiles")
            .find({userId: new ObjectId(userID)})
            .limit(1)
            .toArray();

        //console.log(userProfile)
        return NextResponse.json(userProfile);
    } catch (e) {
        console.error(e);
    }
};