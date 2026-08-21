import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import {
  generateQuestionsForInterview,
} from "../controllers/interviewGeneration.controller";
import {
  getInterviewResult,
} from "../controllers/interviewResult.controller";

const router = Router();

router.post(
  "/:interviewId/generate-questions",
  authenticateUser,
  generateQuestionsForInterview
);

router.get(
  "/:interviewId/result",
  authenticateUser,
  getInterviewResult
);

export default router;