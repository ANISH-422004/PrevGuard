import { Bell } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { darkTheme } = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user.user);
  const privacyScore = 75;
  const sharedApps = [
    { name: "Facebook", email: "user@example.com", risk: "High" },
    { name: "Google", email: "user@gmail.com", risk: "Medium" },
  ];
  const breachAlerts = [
    { service: "LinkedIn", status: "Compromised" },
    { service: "Twitter", status: "Safe" },
  ];

  return (
    <div className={`${
        darkTheme ? "bg-dark-background text-dark-primaryText" : "bg-light-background text-light-primaryText"
      } min-h-screen p-6`}
    >
      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-4">
          <Bell className="cursor-pointer" />
        </div>
      </div>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Privacy Score Card */}
        <div className="bg-secondary bg-opacity-40 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Privacy Risk Score</h3>
          <div className="w-24 h-24 mx-auto">
            <CircularProgressbar
              value={privacyScore}
              text={`${privacyScore}%`}
              styles={buildStyles({
                textColor: darkTheme ? "#E3DFFD" : "#241847",
                pathColor: "#A66CFF",
                trailColor: darkTheme ? "#221736" : "#DCD6F7",
              })}
            />
          </div>
        </div>

        {/* Shared Apps List */}
        <div className="bg-secondary bg-opacity-40 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Shared Apps</h3>
          {sharedApps.map((app, index) => (
            <div key={index} className="p-2 flex justify-between border-b border-gray-500/50">
              <span>{app.name}</span>
              <span className={app.risk === "High" ? "text-red-500" : "text-yellow-500"}>{app.risk}</span>
            </div>
          ))}
        </div>

        {/* Breach Alerts */}
        <div className="bg-secondary bg-opacity-40 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Breach Alerts</h3>
          {breachAlerts.map((alert, index) => (
            <div key={index} className={`p-2 ${alert.status === "Compromised" ? "text-red-500" : "text-green-500"}`}>
              {alert.service} - {alert.status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
