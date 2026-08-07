import { Request, Response } from "express";
import { createInterviewService,   getInterviewsService, } from "../services/interview.service";
import { updateInterviewService,  deleteInterviewService  } from "../services/interview.service";



export const createInterview = async (req: Request, res: Response) => {
  try {
    const { title, jobRole, description } = req.body;

    // Added by auth middleware
    const userId = req.user.id;

    const interview = await createInterviewService({
      title,
      jobRole,
      description,
      userId,
    });

    res.status(201).json({
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const getInterviews = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;

    const interviews = await getInterviewsService(userId);

    res.status(200).json({
      interviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateInterview = async (
  req: Request,
  res: Response
) => {
  try {
    // Get interview ID from the URL
    const interviewId = req.params.id;

    // Get logged-in user's ID from the JWT
    const userId = req.user.id;

    // Get updated values from the request body
    const { title, jobRole, description } = req.body;

    // Call the service
    const interview = await updateInterviewService({
      interviewId,
      userId,
      title,
      jobRole,
      description,
    });

    // Send success response
    res.status(200).json({
      message: "Interview updated successfully",
      interview,
    });

  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};


export const deleteInterview = async (
  req: Request,
  res: Response
) => {
  try {
    // Get interview ID from the URL
    const interviewId = req.params.id;

    // Get logged-in user's ID from the JWT
    const userId = req.user.id;

    // Call the service
    const interview = await deleteInterviewService({
      interviewId,
      userId,
    });

    // Send success response
    res.status(200).json({
      message: "Interview deleted successfully",
      interview,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};