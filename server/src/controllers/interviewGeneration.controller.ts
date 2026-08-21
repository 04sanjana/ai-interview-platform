import { Request, Response } from "express";
import {
  generateQuestionsForInterviewService,
} from "../services/interviewGeneration.service";

export const generateQuestionsForInterview = async (
  req: Request,
  res: Response
) => {
  try {
    const { interviewId } = req.params;

    const userId = req.user!.id;

    if (!interviewId) {
      return res.status(400).json({
        message: "Interview ID is required",
      });
    }

    const questions = await generateQuestionsForInterviewService(
      interviewId,
      userId
    );

    return res.status(201).json({
      message: "Interview questions generated successfully",
      questions,
    });
  } catch (error: any) {
    console.error("Generate questions error:", error);

    if (error.message === "Interview not found or unauthorized") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (
      error.message ===
      "Please upload a resume before generating questions"
    ) {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (error.message === "Resume text could not be extracted") {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (
      error.message === "Gemini returned invalid question data" ||
      error.message === "Gemini did not return a question array" ||
      error.message === "Gemini returned no questions"
    ) {
      return res.status(502).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};