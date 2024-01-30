import jwt from "jsonwebtoken";
import { tokenInfo } from "../config";
export class JwtPayload {
  sub: string;
  exp: number;
  iat: number;

  constructor(subject: string, expiresInSec: number) {
    this.sub = subject;
    this.iat = Math.floor(Date.now() / 1000);
    this.exp = this.iat + expiresInSec;
  }
}

// Function that will encode the jwt token
export function encode(payload: JwtPayload): string {
  const token = jwt.sign(payload, tokenInfo.secrat);
  return token;
}

// Function that will validate the jwt Token
export function decode(token: string): JwtPayload {
  const decoded = jwt.verify(token, tokenInfo.secrat) as JwtPayload;
  return decoded;
}
