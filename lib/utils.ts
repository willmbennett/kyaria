import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stringToObjectId(id: string): mongoose.Types.ObjectId | null {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  } else {
    return null;
  }
}

export function ObjectIdtoString(data: mongoose.Types.ObjectId): string {
  return data.toString()
}

export function castToString(arg: any) {
  return String(arg);
}

export function dateToString(arg: any) {
  return arg.toISOString();
}

export function createErrorResponse(
  message: string,
  statusCode: number
): NextResponse {
  const errorResponse = {
    status: statusCode >= 500 ? "error" : "fail",
    message,
  };

  return new NextResponse(JSON.stringify(errorResponse), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

export function removeDetailSections(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // If the current property is an object or array, recurse into it
      //console.log("Is an object")
      //console.log(obj[key])
      removeDetailSections(obj[key]);
    }

    // If the current property is named "detail", delete it
    if (key === 'detail') {
      //console.log("to be deleted")
      //console.log(obj[key])
      delete obj[key];
    }
  }
  return obj;
}