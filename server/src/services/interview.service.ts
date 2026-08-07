import prisma from "../config/prisma";

interface CreateInterviewData {
  title: string;
  jobRole: string;
  description?: string;
  userId: number; // change to string if your User.id is String
}

export const createInterviewService = async (
  data: CreateInterviewData
) => {
  return await prisma.interview.create({
    data: {
      title: data.title,
      jobRole: data.jobRole,
      description: data.description,
      userId: data.userId,
    },
  });
};
export const getInterviewsService = async (userId: number) => {
  return await prisma.interview.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
// interview od is thr token generated when logged in not user id ok?
interface UpdateInterviewData {
  interviewId: string;
  userId: number;
  title: string;
  jobRole: string;
  description?: string;
}

export const updateInterviewService = async (
  data: UpdateInterviewData
) => {

  //interview by its id ,this interview id we took from controllers
  const interview = await prisma.interview.findUnique({
    where: {
      id: data.interviewId,
    },
  });

  // Check if the interview exists
  if (!interview) {
    throw new Error("Interview not found");
  }

  // Check if the logged-in user is same as this user interview
  if (interview.userId !== data.userId) {
    throw new Error("Unauthorized");
  }

  // Update the interview
  const updatedInterview = await prisma.interview.update({
    where: {
      id: data.interviewId,
    },
    data: {
      title: data.title,
      jobRole: data.jobRole,
      description: data.description,
    },
  });

  // Return the updated interview
  return updatedInterview;
};

interface DeleteInterviewData {
  interviewId: string;
  userId: number;
}

export const deleteInterviewService = async (
  data: DeleteInterviewData
) => {

  // Step 1: Find the interview
  const interview = await prisma.interview.findUnique({
    where: {
      id: data.interviewId,
    },
  });

  // Step 2: Check if it exists
  if (!interview) {
    throw new Error("Interview not found");
  }

  // Step 3: Check ownership
  if (interview.userId !== data.userId) {
    throw new Error("Unauthorized");
  }

  // Step 4: Delete the interview
  const deletedInterview = await prisma.interview.delete({
    where: {
      id: data.interviewId,
    },
  });

  // Step 5: Return the deleted interview
  return deletedInterview;
};