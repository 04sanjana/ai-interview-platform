import prisma from "../config/prisma";

export const createInterviewQuestionService = async (
  interviewId: string,
  question: string,
  type: string
) => {
  return await prisma.interviewQuestion.create({
    data: {
      interviewId,
      question,
      type,
    },
  });
};

export const getInterviewQuestionsService = async (
  interviewId: string
) => {
  return await prisma.interviewQuestion.findMany({
    where: {
      interviewId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};