import mongoose from "mongoose";

export function checkIfValidMongooseId(id: string): boolean {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    return objectId.toString() === id;
  } catch (error: any) {
    return false;
  }
}
