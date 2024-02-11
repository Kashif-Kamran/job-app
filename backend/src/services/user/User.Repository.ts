import _ from "lodash";
import { BadRequestError, InternalServerError } from "../../core/ApiError";
import { UserDTO, UserType, userModel } from "./User.Model";
// That function is use to get User Type
function getUserType(userInfo: any): UserType | null {
  if (userInfo === null) return null;
  return _.pick(userInfo, [
    "name",
    "email",
    "role",
    "createdAt",
    "_id",
    "password",
  ]);
}
async function create(userInfo: UserDTO): Promise<UserType | null> {
  try {
    let response = await userModel.create(userInfo);
    return getUserType(response);
  } catch (error: any) {
    throw new InternalServerError(
      "Error Occured While Saving User" + error.message
    );
  }
}

// Get User By email
async function getUserByEmail(email: string): Promise<UserType | null> {
  try {
    const user = await userModel.findOne({ email: email });
    return getUserType(user);
  } catch (error: any) {
    throw new InternalServerError(
      "Error Occured While Getting User By Email : " + error.message
    );
  }
}

export default {
  create,
  getUserByEmail,
};
