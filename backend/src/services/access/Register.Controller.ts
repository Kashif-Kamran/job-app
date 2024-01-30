import { User } from "../../services/user/User.Model";

type UserDTO = {
  name: string;
  email: string;
  password: string;
  role?: string;
};

export async function registerUser(userInfo: UserDTO) {
  try {
    if (userInfo.role === undefined) userInfo.role = "user";

    let newUser = new User(
      userInfo.name,
      userInfo.email,
      userInfo.password,
      userInfo.role
    );
  } catch (error) {}
}
