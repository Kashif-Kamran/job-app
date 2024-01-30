import { InternalServerError } from "../../core/ApiError";
import { User, userModel } from "./User.Model";

export async function save(userInfo: User) {
  try {
    const user = new userModel(userInfo);
    await user.save();
  } catch (error: any) {
    throw new InternalServerError(
      "Error Occured While Saving User" + error.message
    );
  }
}
