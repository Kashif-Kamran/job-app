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

export { userModel, User };
