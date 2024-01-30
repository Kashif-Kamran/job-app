import { SuccessMessageResponse } from "../../core/ApiResponse";
import { Router, Request, Response } from "express";
import { PublicRequest } from "../../types/app-request";

const router = Router();

router.get("/", (req: PublicRequest, res: Response) => {
  new SuccessMessageResponse("Successfully Hit Login Route").send(res);
});

export default router;
