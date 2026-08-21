import { extractResumeText } from "./services/resumeService";

const test = async () => {
    const text = await extractResumeText(
        "src/uploads/resumes/1786121506027.pdf"
    );

    console.log(text);
};

test();