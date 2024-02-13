import { getModelForClass, prop, DocumentType } from "@typegoose/typegoose";
import { Schema } from "mongoose";

class User {
  @prop({ type: Schema.Types.ObjectId, auto: true })
  _id!: string; // Add _id property
  @prop()
  name!: string;
  @prop()
  email!: string;
  @prop()
  password!: string;
  @prop()
  role!: string;
  @prop({ default: new Date() })
  createdAt: Date = new Date();
}

const userModel = getModelForClass(User);

// Types

type UserType = Pick<
  User,
  "name" | "email" | "password" | "role" | "createdAt" | "_id"
>;

type UserDTO = Pick<UserType, "name" | "password" | "email"> & {
  role?: string;
  _id?: string;
};

type UserRO = Pick<UserType, "name" | "email" | "role" | "createdAt" | "_id">;

type PartialUserDTO = Partial<
  Pick<UserType, "name" | "email" | "password" | "role">
>;
// exporting the model and types
export { userModel, User, UserType, UserDTO, PartialUserDTO, UserRO };
