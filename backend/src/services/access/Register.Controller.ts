import { User } from "../../services/user/User.Model";
import bcrypt from "bcrypt";
import userRepo from "../user/User.Repository";
import { BadRequestError } from "../../core/ApiError";
type UserDTO = {
  name: string;
  email: string;
  password: string;
  role?: string;
};

export default async function registerUser(userInfo: UserDTO) {
  try {
    const user = await userRepo.getUserByEmail(userInfo.email);
    if (user) throw new BadRequestError("User Already Exists");
    if (userInfo.role === undefined) userInfo.role = "user";
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    await userRepo.create({
      name: userInfo.name,
      email: userInfo.email,
      password: hashedPassword,
      role: userInfo.role,
    } as User);
    return;
  } catch (error) {}
}
