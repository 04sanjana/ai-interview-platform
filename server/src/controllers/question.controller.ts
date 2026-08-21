import { Request, Response } from "express";
import {
  createQuestionService,
  getQuestionsByInterviewService,
} from "../services/question.service";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { interviewId, question, type } = req.body;

    if (!interviewId || !question || !type) {
      return res.status(400).json({
        message: "interviewId, question and type are required",
      });
    }

    const newQuestion = await createQuestionService({
      interviewId,
      question,
      type,
    });

    return res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    console.error("Create question error:", error);

    return res.status(500).json({
      message: "Failed to create question",
    });
  }
};

export const getQuestionsByInterview = async (
  req: Request,
  res: Response
) => {
  try {
    const { interviewId } = req.params;

    const questions = await getQuestionsByInterviewService(interviewId);

    return res.status(200).json({
      questions,
    });
  } catch (error) {
    console.error("Get questions error:", error);

    return res.status(500).json({
      message: "Failed to get questions",
    });
  }
};