import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateInterviewQuestions = async (
  resumeText: string,
  jobRole: string,
  jobDescription?: string
) => {
  const prompt = `
You are an expert technical interviewer.

Generate 10 interview questions for the following candidate.

Job Role:
${jobRole}

Job Description:
${jobDescription || "Not provided"}

Candidate Resume:
${resumeText}

Requirements:
- Questions must be relevant to the candidate's actual resume.
- Include technical questions based on their skills and projects.
- Include questions about their projects and work experience.
- Include some conceptual questions relevant to the job role.
- Avoid generic questions whenever possible.
- Do not provide answers.
- Return ONLY valid JSON.
- The JSON must be an array of objects.
- Each object must contain:
  "question": the interview question
  "type": one of "technical", "project", "experience", or "behavioral"

Example format:
[
  {
    "question": "Explain how you implemented JWT authentication in your project.",
    "type": "project"
  }
]
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  return text;
};
export const evaluateInterviewAnswer = async (
  question: string,
  answer: string
) => {
  const prompt = `
You are an expert technical interviewer evaluating a candidate's interview answer.

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate the candidate's answer fairly.

Requirements:

- Give a score from 1 to 10.
- Evaluate correctness, relevance, clarity, and completeness.
- Mention what the candidate did well.
- Mention what the candidate could improve.
- Do not be overly harsh.
- Do not give a high score just because the answer is long.
- Return ONLY valid JSON.
- Do not use markdown or code fences.

Return exactly this format:

{
  "score": 7,
  "feedback": "Overall evaluation of the answer.",
  "strengths": "What the candidate did well.",
  "improvements": "What the candidate should improve."
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  try {
    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const evaluation = JSON.parse(cleanedText);

    // Validate score
    if (
      typeof evaluation.score !== "number" ||
      evaluation.score < 1 ||
      evaluation.score > 10
    ) {
      throw new Error("Invalid score from Gemini");
    }

    // Validate required text fields
    if (
      typeof evaluation.feedback !== "string" ||
      typeof evaluation.strengths !== "string" ||
      typeof evaluation.improvements !== "string"
    ) {
      throw new Error("Invalid evaluation format from Gemini");
    }

    return evaluation;

  } catch (error) {
    console.error("Invalid Gemini evaluation:", text);
    throw new Error("Gemini returned invalid evaluation data");
  }
};