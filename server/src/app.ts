import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resume.routes";
import answerRoutes from "./routes/answer.routes";

const app = express();
app.use("/api/resume", resumeRoutes);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/answers", answerRoutes);

app.get("/", (req, res) => {
  res.send("API is running ");
});

export default app;