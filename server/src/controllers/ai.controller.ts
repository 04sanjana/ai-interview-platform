import { Request, Response } from "express";
import { generateInterviewQuestions } from "../services/ai.services";

export const testGemini = async (req: Request, res: Response) => {
  try {
    const result = await generateInterviewQuestions(
      "The candidate knows JavaScript, React, Node.js and PostgreSQL.",
      "React Developer",
      "Build and maintain React applications."
    );

    return res.status(200).json({
      message: "Gemini is working!",
      result,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    return res.status(500).json({
      message: "Gemini request failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};