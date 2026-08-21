import { Router } from "express";
import { createInterview, getInterviews, updateInterview, deleteInterview } from "../controllers/interview.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import { generateQuestionsController } from "../controllers/interviewQuestion.controller";

const router = Router();

router.post("/", authenticateUser, createInterview);
router.get("/", authenticateUser, getInterviews);
router.put("/:id", authenticateUser, updateInterview);export default router;
router.delete("/:id", authenticateUser, deleteInterview);
router.post(
  "/:interviewId/generate-questions",
  authenticateUser,
  generateQuestionsController
);