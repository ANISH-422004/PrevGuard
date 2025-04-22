import React, { useState } from "react";
import axios from "axios";
import sha1 from "crypto-js/sha1";
import { useSelector } from "react-redux";
import zxcvbn from "zxcvbn";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PasswordBreachCheck = () => {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const [password, setPassword] = useState("");
  const [breachCount, setBreachCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const strength = zxcvbn(password);

  const secondsToReadableTime = (seconds) => {
    if (seconds < 60) {
      return `${Math.round(seconds)} seconds`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours`;
    } else if (seconds < 31536000) {
      const days = Math.floor(seconds / 86400);
      return `${days} days`;
    } else {
      const years = seconds / 31536000;
      return `${years.toFixed(1)} years`;
    }
  };

  const checkPassword = async () => {
    if (!password) {
      setBreachCount(0); // Set breach count to 0 if password is empty
      return;
    }

    setLoading(true);
    setBreachCount(null);

    try {
      const hashed = sha1(password).toString().toUpperCase();
      const prefix = hashed.slice(0, 5);
      const suffix = hashed.slice(5);

      const res = await axios.get(
        `https://api.pwnedpasswords.com/range/${prefix}`
      );

      const lines = res.data.split("\n");
      const match = lines.find((line) => line.startsWith(suffix));

      if (match) {
        const count = parseInt(match.split(":")[1]);
        setBreachCount(count);
      } else {
        setBreachCount(0);
      }
    } catch (err) {
      console.error("Error checking password breach:", err);
      setBreachCount(-1);
    }

    setLoading(false);
  };

  const getStrengthLabel = (score) => {
    return ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"][score];
  };

  const chartData = [
    {
      name: "Crack Time (online)",
      value: password
        ? Math.log10(
            strength.crack_times_seconds.online_no_throttling_10_per_second
          )
        : 0,
      rawCrackTime: password
        ? strength.crack_times_seconds.online_no_throttling_10_per_second
        : 0, // Store raw value for tooltip
    },
    {
      name: "Crack Time (offline)",
      value: password
        ? Math.log10(
            strength.crack_times_seconds.offline_slow_hashing_1e4_per_second
          )
        : 0,
      rawCrackTime: password
        ? strength.crack_times_seconds.offline_slow_hashing_1e4_per_second
        : 0, // Store raw value for tooltip
    },
    {
      name: "Entropy",
      value: password ? strength.entropy : 0,
      rawEntropy: password ? strength.entropy : 0, // Optional: Store raw entropy if needed
    },
    {
      name: "Strength Score",
      value: password ? strength.score + 1 : 0,
      rawScore: password ? strength.score + 1 : 0, // Optional: Store raw score if needed
    },
  ];

  const passwordTips = [
    "Use a mix of upper and lowercase letters, numbers, and special characters.",
    "Avoid using easily guessable information like names, birthdays, or common words.",
    "Make your password at least 12 characters long.",
    "Consider using a passphrase, which is a sequence of random words or a sentence.",
    "Use multi-factor authentication (MFA) wherever possible.",
  ];

  return (
    <div
      className={`min-h-screen py-14 w-full flex items-center justify-center px-4 transition-colors duration-300 ${
        darkTheme
          ? "bg-dark-background text-dark-primaryText"
          : "bg-light-background text-light-primaryText"
      }`}
    >
      <div
        className={`w-full max-w-10xl p-8 rounded-2xl shadow-2xl transition-all duration-300 ${
          darkTheme ? "bg-dark-secondary" : "bg-light-secondary"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          🔐 Password Breach Checker
        </h1>

        <input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-3 rounded-xl border-2 outline-none mb-4 transition ${
            darkTheme
              ? "bg-dark-background text-dark-primaryText border-dark-hover placeholder-dark-secondaryText"
              : "bg-light-background text-light-primaryText border-light-hover placeholder-light-secondaryText"
          }`}
        />

        <button
          onClick={checkPassword}
          disabled={loading || !password}
          className={`w-full py-3 rounded-xl font-semibold transition-colors text-lg ${
            darkTheme
              ? "bg-dark-action text-dark-background hover:bg-dark-hover"
              : "bg-light-action text-white hover:bg-light-hover"
          }`}
        >
          {loading ? "Checking..." : "Check Breach"}
        </button>

        {breachCount !== null && (
          <div
            className={`mt-6 text-xl font-medium text-center ${
              breachCount === -1
                ? "text-yellow-500"
                : breachCount > 0
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {breachCount === -1
              ? "❌ Error checking breach."
              : breachCount > 0
              ? `⚠️ This password was found in ${breachCount} breaches. Try a different one for better security.`
              : "✅ This password was not found in any known breach."}
          </div>
        )}

        <div className="mt-8 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold">🔒 Password Strength</h2>
              <div className="text-sm mt-1">
                Strength: <strong>{getStrengthLabel(strength.score)}</strong>
              </div>
              <div className="h-2 w-full bg-gray-300 rounded mt-1">
                <div
                  className="h-2 rounded transition-all duration-300"
                  style={{
                    width: `${(strength.score + 1) * 20}%`,
                    backgroundColor: [
                      "#e74c3c",
                      "#e67e22",
                      "#f1c40f",
                      "#2ecc71",
                      "#27ae60",
                    ][strength.score],
                  }}
                ></div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">💡 Password Tips</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {passwordTips.map((tip, index) => (
                  <li key={index} className="text-left">
                    <span className="font-bold">✔️</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold text-center md:text-left">
              📊 Password Analytics
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value, name, props) => {
                    if (props.dataKey.startsWith("Crack Time")) {
                      return [
                        secondsToReadableTime(props.payload.rawCrackTime),
                        name,
                      ];
                    }
                    return [value, name];
                  }}
                />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordBreachCheck;