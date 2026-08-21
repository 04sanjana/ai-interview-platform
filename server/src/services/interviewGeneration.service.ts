import prisma from "../config/prisma";
import { generateInterviewQuestions } from "./ai.services";

export const generateQuestionsForInterviewService = async (
  interviewId: string,
  userId: number
) => {
  // 1. Find the interview and make sure it belongs to the logged-in user
  const interview = await prisma.interview.findFirst({
    where: {
      id: interviewId,
      userId,
    },
  });

  if (!interview) {
    throw new Error("Interview not found or unauthorized");
  }

  // 2. Find the user's latest uploaded resume
  const resume = await prisma.resume.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!resume) {
    throw new Error("Please upload a resume before generating questions");
  }

  // 3. Make sure resume text was extracted
  if (!resume.text) {
    throw new Error("Resume text could not be extracted");
  }

  // 4. Generate questions using Gemini
  const result = await generateInterviewQuestions(
    resume.text,
    interview.jobRole,
    interview.description || undefined
  );

  // 5. Remove markdown code fences if Gemini returns them
  const cleanedResult = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // 6. Parse Gemini response
  let questions;

  try {
    questions = JSON.parse(cleanedResult);
  } catch (error) {
    console.error("Invalid Gemini question response:", result);
    throw new Error("Gemini returned invalid question data");
  }

  // 7. Validate response
  if (!Array.isArray(questions)) {
    throw new Error("Gemini did not return a question array");
  }

  if (questions.length === 0) {
    throw new Error("Gemini returned no questions");
  }
// 8. Replace existing questions with the newly generated questions
const savedQuestions = await prisma.$transaction(async (tx) => {
  // Delete existing questions
  await tx.interviewQuestion.deleteMany({
    where: {
      interviewId,
    },
  });

  // Create the new questions
  const createdQuestions = [];

  for (const item of questions) {
    const createdQuestion = await tx.interviewQuestion.create({
      data: {
        interviewId,
        question: item.question,
        type: item.type,
      },
    });

    createdQuestions.push(createdQuestion);
  }

  return createdQuestions;
});

  return savedQuestions;
};