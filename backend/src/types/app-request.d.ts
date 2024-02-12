import { Request } from "express";
import { UserType } from "../services/user/User.Model";
declare interface PublicRequest extends Request {}

declare interface ProtectedRequest extends PublicRequest {
  user: UserType;
  accessToken: string;
}
