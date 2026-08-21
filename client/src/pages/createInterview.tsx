
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInterview } from "../api/interviewApi";

function CreateInterview() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [description, setDescription] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resume) {
      setError("Please upload your resume");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 1. Create the interview
      const data = await createInterview({
        title,
        jobRole,
        description,
      });

      console.log("Interview created:", data);

      // The backend returns the interview inside data.interview
      const interviewId = data.interview.id;

      console.log("Interview ID:", interviewId);

      // Resume upload will be connected next.
      // For now, go to the interview page.
      navigate(`/interview/${interviewId}`);
    } catch (err: any) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to create interview"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            AI Interview Platform
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Create New Interview
          </h2>

          <p className="mt-2 text-gray-600 mb-8">
            Set up your interview and upload your resume to get
            personalized AI-generated questions.
          </p>

          {error && (
            <div className="mb-6 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Interview title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interview Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Software Engineer Interview"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Job role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Role
              </label>

              <input
                type="text"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                placeholder="e.g. Full Stack Developer"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interview Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the type of interview you want to practice..."
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Resume */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume
              </label>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setResume(e.target.files?.[0] || null)
                }
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-600"
              />

              <p className="mt-2 text-xs text-gray-500">
                Supported formats: PDF, DOC, DOCX
              </p>

              {resume && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {resume.name}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Interview"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateInterview;
