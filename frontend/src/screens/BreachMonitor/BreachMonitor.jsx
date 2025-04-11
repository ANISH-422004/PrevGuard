import React, { useState } from "react";
import axiosInstance from "../../config/axios/axios";
import { useSelector } from "react-redux";
import { CheckCircle, AlertTriangle } from "lucide-react";
import Loading from "../../components/Loading";

const BreachMonitor = () => {
  const [email, setEmail] = useState("");
  const [breachData, setBreachData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get(`/api/breaches/${email}`);
      setBreachData(res.data.breachAlert);
    } catch (err) {
      setError("Could not fetch breach info");
    }
    setLoading(false);
  };

  const themeClass = darkTheme ? "dark" : "light";

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 lg:px-16 py-10 bg-${themeClass}-background text-${themeClass}-primaryText transition-all flex flex-col items-center`}
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">
        🔐 Email Breach Monitor
      </h1>

      {/* Input Section */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl flex flex-col sm:flex-row gap-4 mb-10">
        <input
          type="email"
          className={`flex-1 px-4 py-2 rounded-lg bg-${themeClass}-secondary text-${themeClass}-primaryText placeholder-${themeClass}-secondaryText focus:outline-none`}
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className={`px-6 py-2 rounded-lg text-white bg-${themeClass}-action hover:bg-${themeClass}-hover transition-all`}
        >
          Search
        </button>
      </div>

      {/* Feedback Section */}
      {loading && <p className="text-sm sm:text-base flex gap-4"><Loading/> Checking breaches...</p>}
      {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}

      {/* Results Section */}
      {breachData && (
        <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-center sm:text-left">
            Results for <span className="underline">{breachData.email}</span>
          </h2>

          {breachData.breaches.length === 0 ? (
            <div className="flex items-center gap-3 bg-green-100 text-green-700 border border-green-300 px-6 py-4 rounded-xl shadow-md">
              <CheckCircle className="w-6 h-6" />
              <span>No breaches found — you're safe! ✅</span>
            </div>
          ) : (
            breachData.breaches.map((breach, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-red-500 shadow-lg transition hover:scale-[1.01]"
              >
                <div className="flex items-center gap-2 mb-2 text-red-400 font-semibold text-sm sm:text-base">
                  <AlertTriangle className="w-5 h-5" />
                  Breach Detected
                </div>
                <p><strong>🛡 Source:</strong> {breach.source}</p>
                <p><strong>📅 Date:</strong> {new Date(breach.date).toLocaleDateString()}</p>
                <p><strong>🔐 Type:</strong> {breach.type}</p>
                <p><strong>📄 Details:</strong> {breach.details}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BreachMonitor;
