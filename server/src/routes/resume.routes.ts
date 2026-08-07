import express from "express";
import upload from "../config/multer";
import { authenticateUser } from "../middleware/auth.middleware";
import { uploadResume } from "../controllers/resume.controller";

const router = express.Router();

router.post(
  "/upload",
  authenticateUser,
  upload.single("resume"),
  uploadResume
);

export default router;