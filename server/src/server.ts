import app from "./app";
import interviewRoutes from "./routes/interview.routes";
import resumeRoutes from "./routes/resume.routes";

app.use("/api/resume", resumeRoutes);
app.use("/api/interviews", interviewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});