import prisma from "../config/prisma";
import { evaluateInterviewAnswer } from "./ai.services";

interface CreateAnswerData {
  questionId: string;
  answer: string;
  userId: number;
}

export const createAnswerService = async (
  data: CreateAnswerData
) => {
const { questionId, answer, userId } = data;
  // 1. Check whether the question exists
const question = await prisma.interviewQuestion.findUnique({
  where: {
    id: questionId,
  },
  include: {
    interview: true,
  },
});

if (!question) {
  throw new Error("Question not found");
}

if (question.interview.userId !== userId) {
  throw new Error("You are not authorized to answer this question");
}
  // 2. Check if an answer already exists
  const existingAnswer = await prisma.interviewAnswer.findUnique({
    where: {
      questionId,
    },
  });

  if (existingAnswer) {
    throw new Error("Answer already submitted for this question");
  }

  // 3. Ask Gemini to evaluate the answer
  const evaluation = await evaluateInterviewAnswer(
    question.question,
    answer
  );

  // 4. Save answer + AI evaluation
  const newAnswer = await prisma.interviewAnswer.create({
    data: {
      questionId,
      answer,
      score: evaluation.score,
      feedback: evaluation.feedback,
      strengths: evaluation.strengths,
      improvements: evaluation.improvements,
    },
  });

  return newAnswer;
};