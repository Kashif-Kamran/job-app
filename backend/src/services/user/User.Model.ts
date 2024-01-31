import { getModelForClass, prop } from "@typegoose/typegoose";

class User {
  @prop()
  name: string;
  @prop()
  email: string;
  @prop()
  password: string;
  @prop()
  role: string;
  @prop()
  createdAt: Date;

  constructor(name: string, email: string, password: string, role: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
  }
}

const userModel = getModelForClass(User);

// Types
type UserType = Pick<User, "name" | "email" | "password" | "role">;
type UserDTO = Pick<UserType, "name" | "password" | "email"> & { role: string };
type PartialUserDTO = Partial<UserType>;

export { userModel, User, UserType, UserDTO, PartialUserDTO };
