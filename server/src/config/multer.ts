import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("✅ Destination callback reached");
        console.log("File:", file);

        cb(null, "src/uploads/resumes");
    },

    filename: (req, file, cb) => {
        console.log("✅ Filename callback reached");
        console.log("File:", file);

        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {

    console.log("Original Name:", file.originalname);
    console.log("Mime Type:", file.mimetype);

    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export default upload;