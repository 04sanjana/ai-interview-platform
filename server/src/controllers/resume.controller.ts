import { Request, Response } from "express";

export const uploadResume = async (
    req: Request,
    res: Response
) => {
    console.log(req.body);
console.log(req.file);
    if (!req.file) {
        return res.status(400).json({
            message: "No resume uploaded.",
        });
    }

    console.log(req.file);

    return res.status(200).json({
        message: "Resume uploaded successfully!",
        file: req.file,
    });
};