import { BadRequestError, InternalServerError } from "../../core/ApiError";
import { User, userModel } from "./User.Model";

// This function handles saveing new user to database
async function create(userInfo: User) {
  try {
    const user = new userModel(userInfo);
    await user.save();
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
