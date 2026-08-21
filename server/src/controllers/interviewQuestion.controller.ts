import { Request, Response } from "express";
import prisma from "../config/prisma";
import { generateInterviewQuestions } from "../services/ai.services";

export const generateQuestionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { interviewId } = req.params;
    const userId = (req as any).user.id;

    // 1. Find the interview
    const interview = await prisma.interview.findUnique({
      where: {
        id: interviewId,
      },
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    // 2. Check ownership
    if (interview.userId !== userId) {
      return res.status(403).json({
        message: "You are not authorized to access this interview",
      });
    }

    // 3. Find user's resume
    const resume = await prisma.resume.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!resume || !resume.text) {
      return res.status(404).json({
        message: "Resume not found. Please upload a resume first.",
      });
    }

    // 4. Generate questions using Gemini
    const generatedQuestions = await generateInterviewQuestions(
      resume.text,
      interview.jobRole,
      interview.description || undefined
    );

    // 5. Convert Gemini response into JavaScript object
    const questions = JSON.parse(generatedQuestions);

    // 6. Save questions in database
    const savedQuestions = await prisma.interviewQuestion.createMany({
      data: questions.map((q: any) => ({
        interviewId,
        question: q.question,
        type: q.type,
      })),
    });

    return res.status(201).json({
      message: "Interview questions generated successfully",
      count: savedQuestions.count,
      questions,
    });
  } catch (error) {
    console.error("Generate questions error:", error);

    return res.status(500).json({
      message: "Failed to generate interview questions",
    });
  }
};