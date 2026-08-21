import prisma from "../config/prisma";

export const getInterviewResultService = async (
  interviewId: string,
  userId: number
) => {
  // 1. Find the interview and verify ownership
  const interview = await prisma.interview.findFirst({
    where: {
      id: interviewId,
      userId,
    },
    include: {
      questions: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          answer: true,
        },
      },
    },
  });

  if (!interview) {
    throw new Error("Interview not found or unauthorized");
  }

  // 2. Calculate overall score from answered questions
  const answeredQuestions = interview.questions.filter(
    (question) => question.answer !== null
  );

  const totalScore = answeredQuestions.reduce(
    (sum, question) => sum + (question.answer?.score || 0),
    0
  );

  const averageScore =
    answeredQuestions.length > 0
      ? Number((totalScore / answeredQuestions.length).toFixed(2))
      : null;

  return {
    interview: {
      id: interview.id,
      title: interview.title,
      jobRole: interview.jobRole,
      description: interview.description,
      createdAt: interview.createdAt,
    },

    statistics: {
      totalQuestions: interview.questions.length,
      answeredQuestions: answeredQuestions.length,
      unansweredQuestions:
        interview.questions.length - answeredQuestions.length,
      averageScore,
    },

    questions: interview.questions,
  };
};