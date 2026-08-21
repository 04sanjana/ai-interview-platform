import { Router } from "express";
import { createAnswer } from "../controllers/answer.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticateUser, createAnswer);

export default router;