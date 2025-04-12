import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { calculateEmailRiskScore } from "../../utils/riskCalculator";
import axiosInstance from "../../config/axios/axios";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const { darkTheme } = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user.user);
  const [emailRiskScores, setEmailRiskScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/api/user/${user._id}`)
      .then((res) => {
        const { breachAlerts } = res.data.user;

        const emailScores = breachAlerts.map((entry) => ({
          email: entry.email,
          _id: entry._id,
          score: calculateEmailRiskScore(entry.breaches),
        }));

        console.log(emailScores);

        setEmailRiskScores(emailScores);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={`transition-colors duration-300 ${
        darkTheme
          ? "bg-dark-background text-dark-primaryText"
          : "bg-light-background text-light-primaryText"
      } min-h-screen p-6`}
    >
      {/* Top Navbar */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="flex items-center gap-4">
              {/* Optional: Add Bell Icon or Toggle */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {emailRiskScores.map(({ email, score }) => {
              let badgeColor =
                score < 30
                  ? "text-green-500"
                  : score < 70
                  ? "text-yellow-400"
                  : "text-red-500";

              return (
                <div
                  key={email}
                  className={`transition-all duration-300 hover:scale-[1.02] backdrop-blur-md border rounded-2xl p-5 flex flex-col justify-between shadow-md ${
                    darkTheme
                      ? "bg-dark-secondary border-white/10 text-dark-primaryText"
                      : "bg-light-secondary border-gray-300 text-light-primaryText"
                  }`}
                >
                  <h3 className="text-lg font-semibold break-words">{email}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className={`text-sm font-bold ${badgeColor}`}>
                      Risk Score: {score}/100
                    </span>
                    <div className="w-12 h-12">
                      <CircularProgressbar
                        value={score}
                        text={`${score}`}
                        styles={buildStyles({
                          textColor: darkTheme ? "#E3DFFD" : "#241847",
                          pathColor:
                            score < 30
                              ? "#22c55e"
                              : score < 70
                              ? "#facc15"
                              : "#ef4444",
                          trailColor: darkTheme ? "#221736" : "#DCD6F7",
                        })}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
