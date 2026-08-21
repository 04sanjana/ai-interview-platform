import { Request, Response } from "express";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import prisma from "../config/prisma";

export const uploadResume = async (req: Request, res: Response) => {
  try {
    // Check authentication
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Check uploaded file
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume",
      });
    }

    const file = req.file;

    // Read uploaded PDF
    const dataBuffer = fs.readFileSync(file.path);

    // Extract text from PDF using pdf-parse v2
    const parser = new PDFParse({
      data: dataBuffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    const extractedText = result.text;

    // Save resume information in database
    const resume = await prisma.resume.create({
      data: {
        userId: Number(userId),
        originalName: file.originalname,
        fileName: file.filename,
        filePath: file.path,
        fileType: file.mimetype,
        fileSize: file.size,
        text: extractedText,
      },
    });

    return res.status(201).json({
      message: "Resume uploaded successfully!",
      resume: {
        id: resume.id,
        originalName: resume.originalName,
        fileName: resume.fileName,
        fileType: resume.fileType,
        fileSize: resume.fileSize,
        text: resume.text,
        createdAt: resume.createdAt,
      },
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    return res.status(500).json({
      message: "Failed to upload resume",
      error: error instanceof Error ? error.message : error,
    });
  }
};