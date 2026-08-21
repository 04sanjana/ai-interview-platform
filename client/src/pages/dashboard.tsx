import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // We'll clear the JWT here once we store it after login
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            AI Interview Platform
          </h1>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back!
          </h2>

          <p className="mt-2 text-gray-600">
            Prepare for your next interview with AI-powered practice.
          </p>
        </section>

        {/* Main action */}
        <section className="bg-blue-600 rounded-2xl p-8 text-white mb-8">
          <h3 className="text-2xl font-bold">
            Ready for your next interview?
          </h3>

          <p className="mt-2 text-blue-100">
            Upload your resume and let AI generate personalized interview
            questions for you.
          </p>

          <Link
            to="/interview/create"
            className="inline-block mt-6 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-gray-100"
          >
            Start New Interview
          </Link>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">
              Total Interviews
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">
              Average Score
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              —
            </p>
          </div>
        </section>

        {/* Recent interviews */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900">
            Recent Interviews
          </h3>

          <div className="mt-6 text-center py-10 text-gray-500">
            <p>No interviews yet.</p>

            <p className="mt-2 text-sm">
              Start your first AI-powered interview to see it here.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
