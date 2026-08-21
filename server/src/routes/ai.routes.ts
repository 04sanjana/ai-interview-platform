import { Router } from "express";
import { testGemini } from "../controllers/ai.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = Router();

router.get("/test", authenticateUser, testGemini);

export default router;