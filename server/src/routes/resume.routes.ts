import express from "express";
import multer from "multer";
import { authenticateUser } from "../middleware/auth.middleware";
import { uploadResume } from "../controllers/resume.controller";

const router = express.Router();

const upload = multer({ dest: "src/uploads/resumes" });


router.post(
  "/upload",
  authenticateUser,
  upload.single("resume"),
  uploadResume
);

export default router;