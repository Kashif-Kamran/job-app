import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import "./database";
import { ApiError, InternalServerError } from "./core/ApiError";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

app.get("/health", (req, res) => {
  res.status(200).send("Server is up and running");
});
console.log("Dev : ", process.env.NODE_ENV);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return ApiError.handle(err, res);
  }
  console.log("❌ Error is not part of ApiError Class : ");
  console.log("Error Message : ", err.message);
  console.log("Error Stack : ", err.stack);
  console.log("--------");
  return ApiError.handle(new InternalServerError(err.message), res);
});

export default app;
