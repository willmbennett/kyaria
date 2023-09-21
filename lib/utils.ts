import mongoose from "mongoose";

export function stringToObjectId(id: string): mongoose.Types.ObjectId | null {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  } else {
    return null;
  }
}

export function ObjectIdtoString(id: mongoose.Types.ObjectId): string {
  return id.toString()
}

export function castToString(arg: any) {
  return String(arg);
}