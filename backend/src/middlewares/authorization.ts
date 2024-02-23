import { Response, NextFunction } from "express";
import { ProtectedRequest } from "../types/app-request";
import { AuthFailureError } from "../core/ApiError";

let authrization = (roles: string[]) => {
  return (req: ProtectedRequest, res: Response, next: NextFunction) => {
    if (roles.includes(req.user!.role)) next();
    else next(new AuthFailureError("Forbidden Access"));
  };
};

export default authrization;
