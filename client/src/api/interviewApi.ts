import api from "./axios";

export interface CreateInterviewData {
  title: string;
  jobRole: string;
  description: string;
}

export const createInterview = async (
  data: CreateInterviewData
) => {
  const response = await api.post("/interviews", data);
  return response.data;
};

export const getInterviews = async () => {
  const response = await api.get("/interviews");
  return response.data;
};

export const generateQuestions = async (
  interviewId: string
) => {
  const response = await api.post(
    `/interviews/${interviewId}/generate-questions`
  );

  return response.data;
};

export const uploadResume = async (file: File) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await api.post(
    "/resumes/upload",
    formData
  );

  return response.data;
};
