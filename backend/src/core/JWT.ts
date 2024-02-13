import jwt from "jsonwebtoken";
import { tokenInfo } from "../config";
import {
  AuthFailureError,
  InternalServerError,
  TokenExpiredError,
} from "./ApiError";
export class JwtPayload {
  sub: string;
  exp: number;
  iat: number;

  constructor(subject: string, expiresInDays: number) {
    this.sub = subject;
    this.iat = Math.floor(Date.now() / 1000);
    this.exp = this.iat + expiresInDays * 60 * 60 * 24;
  }
}

// Function that will encode the jwt token
export function encode(payload: JwtPayload): string {
  const token = jwt.sign({ ...payload }, tokenInfo.secrat);
  return token;
}

// This function is going to be used for validation
export function validate(token: string) {
  try {
    return jwt.verify(token, tokenInfo.secrat) as JwtPayload;
  } catch (error: any) {
    if (error.name === "TokenExpiredError")
      throw new TokenExpiredError("Authentication Token Expired");
    if (error.name === "JsonWebTokenError")
      throw new AuthFailureError("Invalid Authentication Token");

    throw new InternalServerError("Error Occured While Validating Token");
  }
}

// This function will decode the token and return the payload
export function decode(token: string): JwtPayload {
  const decoded = jwt.verify(token, tokenInfo.secrat, {
    ignoreExpiration: true,
  }) as JwtPayload;
  return decoded;
}
