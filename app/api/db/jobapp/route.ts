import connectDB from "../../../../lib/connect-db";
import { createErrorResponse } from "../../../../lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getUserJobApps } from "../../../../lib/app-db";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    //const page_str = request.nextUrl.searchParams.get("page");
    //const limit_str = request.nextUrl.searchParams.get("limit");

    //const page = page_str ? parseInt(page_str, 10) : 1;
    //const limit = limit_str ? parseInt(limit_str, 10) : 10;

    const userId = "650f813286f63a9d8c0080ee"

    const { jobApps, results, error } = await getUserJobApps({ userId });

    if (error) {
      throw error;
    }

    let json_response = {
      status: "success",
      results,
      jobApps,
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    return createErrorResponse(error.message, 500);
  }
}