import { Request } from "express";
import { UserRO, UserType } from "../services/user/User.Model";
declare interface ProtectedRequest extends Request {
  user?: UserRO;
  accessToken?: string;
}
declare interface PublicRequest extends Request {}
