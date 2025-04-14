import React, { useState } from "react";
import axios from "axios";
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
      const res = await axios.get(
        `https://api.xposedornot.com/v1/breach-analytics?email=${email}`
      );
      setBreachData(res.data);
    } catch (err) {
      setError("Could not fetch breach info");
    } finally {
      setLoading(false);
    }
  };

  const themeClass = darkTheme ? "dark" : "light";

  const renderExposedData = () => {
    return breachData?.BreachMetrics?.xposed_data[0]?.children.map((category, i) => (
      <div key={i} className="mb-3">
        <h4 className="font-semibold text-md">{category.name}</h4>
        <ul className="list-disc list-inside ml-4 text-sm">
          {category.children.map((item, j) => (
            <li key={j}>{item.name.replace("data_", "")}</li>
          ))}
        </ul>
      </div>
    ));
  };

  const renderBreaches = () => {
    const breaches = breachData?.ExposedBreaches?.breaches_details || [];
    return breaches.map((breach, index) => (
      <div
        key={index}
        className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-red-500 shadow-lg transition hover:scale-[1.01]"
      >
        <div className="flex items-center gap-2 mb-2 text-red-400 font-semibold text-sm sm:text-base">
          <AlertTriangle className="w-5 h-5" />
          Breach Detected
        </div>
        <img src={breach.logo} alt={breach.breach} className="w-20 h-auto mb-3" />
        <p><strong>📛 Breach:</strong> {breach.breach}</p>
        <p><strong>🧠 Industry:</strong> {breach.industry}</p>
        <p><strong>📅 Year:</strong> {breach.xposed_date}</p>
        <p><strong>🧾 Records:</strong> {breach.xposed_records.toLocaleString()}</p>
        <p><strong>🔐 Exposed:</strong> {breach.xposed_data}</p>
        <p><strong>📖 Details:</strong> {breach.details}</p>
        <a
          href={breach.references}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 underline text-sm mt-2 inline-block"
        >
          Learn more
        </a>
      </div>
    ));
  };

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 lg:px-16 py-10 bg-${themeClass}-background text-${themeClass}-primaryText transition-all flex flex-col items-center`}
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">
        🔐 Email Breach Monitor
      </h1>

      <div className="w-full max-w-xl flex flex-col sm:flex-row gap-4 mb-10">
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

      {loading && <p className="text-sm flex gap-4"><Loading /> Checking breaches...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {breachData && (
        <div className="w-full max-w-4xl space-y-6">
          {/* Summary Section */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">🔍 Summary</h2>
            <p>
              Breach Site:{" "}
              <span className="font-medium">{breachData.BreachesSummary?.site}</span>
            </p>
            <p>
              Overall Risk:{" "}
              <span className="font-medium">
                {breachData.BreachMetrics?.risk[0]?.risk_label} (
                {breachData.BreachMetrics?.risk[0]?.risk_score})
              </span>
            </p>
            <p>
              Weak Passwords:{" "}
              <span className="font-medium">
                {breachData.BreachMetrics?.passwords_strength[0]?.EasyToCrack}
              </span>
            </p>
          </div>

          {/* Exposed Data Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">📂 Exposed Data</h2>
            {renderExposedData()}
          </div>

          {/* Breaches Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">📛 Breaches</h2>
            {renderBreaches()}
          </div>
        </div>
      )}
    </div>
  );
};

export default BreachMonitor;
