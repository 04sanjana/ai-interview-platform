import prisma from "../config/prisma";

interface CreateQuestionData {
  interviewId: string;
  question: string;
  type: string;
}

export const createQuestionService = async (
  data: CreateQuestionData
) => {
  const question = await prisma.interviewQuestion.create({
    data: {
      interviewId: data.interviewId,
      question: data.question,
      type: data.type,
    },
  });

  return question;
};
export const getQuestionsByInterviewService = async (
  interviewId: string
) => {
  const questions = await prisma.interviewQuestion.findMany({
    where: {
      interviewId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return questions;
};