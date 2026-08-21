import app from "./app";
import interviewRoutes from "./routes/interview.routes";
import resumeRoutes from "./routes/resume.routes";
import questionRoutes from "./routes/question.routes";
import aiRoutes from "./routes/ai.routes";
import interviewGenerationRoutes from "./routes/interviewGeneration.routes";

app.use("/api/interviews", interviewGenerationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});