import { Request, Response } from "express";
import { createAnswerService } from "../services/answer.service";

export const createAnswer = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("REQ BODY:", req.body);

    const { questionId, answer } = req.body;

    if (!questionId || !answer) {
      return res.status(400).json({
        message: "questionId and answer are required",
      });
    }

    const userId = req.user!.id;

    const newAnswer = await createAnswerService({
      questionId,
      answer,
      userId,
    });

    return res.status(201).json({
      message: "Answer submitted successfully",
      answer: newAnswer,
    });

  } catch (error: any) {
    console.error("Create answer error:", error);

    if (error.message === "Question not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "You are not authorized to answer this question") {
      return res.status(403).json({
        message: error.message,
      });
    }

    if (error.message === "Answer already submitted for this question") {
      return res.status(409).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to submit answer",
      error: error.message,
    });
  }
};