import { BadRequestError, NotFoundError } from "../../core/ApiError";
import _ from "lodash";
import { User, UserDTO, UserType } from "./User.Model";
import UserRepository from "./User.Repository";
import bcrypt, { hash } from "bcrypt";
import { JwtPayload, encode } from "../../core/JWT";

type LoginDTO = {
  email: string;
  password: string;
};

function getSanatizedUser(user: UserType) {
  return _.pick(user, ["_id", "name", "email", "role", "createdAt"]);
}

async function createUser(userInfo: UserDTO) {
  let userWithSameEmail = await UserRepository.getUserByEmail(userInfo.email);
  if (userWithSameEmail) throw new BadRequestError("Email already exists");
  if (!userInfo.role) userInfo.role = "user";
  const hashedPassword = await bcrypt.hash(userInfo.password, 10);
  let result = await UserRepository.create({
    name: userInfo.name,
    email: userInfo.email,
    password: hashedPassword,
    role: userInfo.role,
  });
  return result;
}

async function loginUser(userLoginInfo: LoginDTO) {
  const userByEmail = await UserRepository.getUserByEmail(userLoginInfo.email);
  if (!userByEmail) throw new BadRequestError("Email did not match any record");

  const isValidUser = bcrypt.compareSync(
    userLoginInfo.password,
    userByEmail.password
  );
  if (!isValidUser)
    throw new BadRequestError("Password did not match with user password");

  // Create Access Token
  const accessToken = new JwtPayload(userByEmail._id, 5); // 5 minutes Token Expiry For Now
  const token = encode(accessToken);
  return {
    token: token,
    user: getSanatizedUser(userByEmail),
  };
}

async function getUserById(id: string) {
  if (!(await UserRepository.checkIfValidId(id)))
    throw new NotFoundError("User Not Found");
  let user = await UserRepository.getUserById(id);
  if (!user) throw new BadRequestError("User Not Found");
  return getSanatizedUser(user);
}
export default {
  createUser,
  loginUser,
  getUserById,
};
