import { Request as ExpressRequest } from "express";

export class PublicRequest extends ExpressRequest {}

export class ProtectedRequest extends PublicRequest {}
