import { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/auth.service";
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUserService(email, password);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const result = await registerUserService(
    name,
    email,
    password
  );

  res.status(200).json(result);
};
