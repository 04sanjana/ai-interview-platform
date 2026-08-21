import { Router } from "express";
import {
  createQuestion,
  getQuestionsByInterview,
} from "../controllers/question.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticateUser, createQuestion);

router.get(
  "/interview/:interviewId",
  authenticateUser,
  getQuestionsByInterview
);

export default router;