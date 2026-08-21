import { Request, Response } from "express";
import { getInterviewResultService } from "../services/interviewResult.service";

export const getInterviewResult = async (
  req: Request,
  res: Response
) => {
  try {
    const { interviewId } = req.params;
    const userId = req.user!.id;

    if (!interviewId) {
      return res.status(400).json({
        message: "Interview ID is required",
      });
    }

    const result = await getInterviewResultService(
      interviewId,
      userId
    );

    return res.status(200).json(result);

  } catch (error: any) {
    console.error("Get interview result error:", error);

    if (error.message === "Interview not found or unauthorized") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to get interview result",
      error: error.message,
    });
  }
};