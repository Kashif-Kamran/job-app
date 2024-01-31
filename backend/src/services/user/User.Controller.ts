import { BadRequestError } from "../../core/ApiError";
import { User, UserDTO } from "./User.Model";
import UserRepository from "./User.Repository";
import bcrypt, { hash } from "bcrypt";

async function createUser(userInfo: UserDTO) {
  let userWithSameEmail = await UserRepository.getUserByEmail(userInfo.email);
  if (userWithSameEmail) throw new BadRequestError("User Already Exists");
  if (!userInfo.role) userInfo.role = "user";
  const hashedPassword = await bcrypt.hash(userInfo.password, 10);
  UserRepository.create({
    name: userInfo.name,
    email: userInfo.email,
    password: hashedPassword,
    role: userInfo.role,
  });
}

export default {
  createUser,
};
