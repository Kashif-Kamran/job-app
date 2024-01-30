import { BadRequestError, InternalServerError } from "../../core/ApiError";
import { User, UserType, userModel } from "./User.Model";

async function create(userInfo: UserType) {
  try {
    let response = await userModel.create(userInfo);
    return response;
  } catch (error: any) {
    throw new InternalServerError(
      "Error Occured While Saving User" + error.message
    );
  }
}

// Get User By email
async function getUserByEmail(email: string) {
  try {
    const user = await userModel.findOne({ email: email });
    return user;
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
