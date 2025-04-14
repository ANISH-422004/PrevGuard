import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../config/axios/axios";
import Loading from "../../components/Loading";
import { fetchBreaches } from "../../app/actions/breachActions";
import { setSharedAppsData } from "../../app/slices/sharedAppsSlice";
import mapAppsToRisk from "../../utils/riskCalculator";
import RiskDetailsModal from "../../components/RiskDetailsModal/RiskDetailsModal"; // Import the modal component

const Dashboard = () => {
  const { darkTheme } = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const breaches = useSelector((state) => state.breaches.data);
  const sharedApps = useSelector((state) => state.sharedApps.sharedApps);
  const dispatch = useDispatch();
  const riskReport = mapAppsToRisk(sharedApps, breaches);
  const [selectedRiskItem, setSelectedRiskItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("Risk Report:", riskReport);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/api/sharedApps");
        dispatch(setSharedAppsData(res.data));
        await dispatch(fetchBreaches());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [dispatch]);

  const getRiskColor = (degree) => {
    if (degree >= 70) return darkTheme ? "#FF4D4D" : "#FF4D4D";
    if (degree >= 40) return darkTheme ? "#FFAA4C" : "#FFAA4C";
    return darkTheme ? "#50C878" : "#50C878";
  };

  const openRiskDetails = (riskItem) => {
    setSelectedRiskItem(riskItem);
    setIsModalOpen(true);
  };

  const closeRiskDetails = () => {
    setIsModalOpen(false);
    setSelectedRiskItem(null);
  };

  return (
    <div
      className={`transition-colors duration-300 ${
        darkTheme
          ? "bg-dark-background text-dark-primaryText"
          : "bg-light-background text-light-primaryText"
      } min-h-screen p-4 sm:p-6`}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Risk Assessment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {riskReport.map((riskItem) => (
              <div
                key={riskItem.appId}
                className={`rounded-lg p-4 shadow-md transition-colors duration-300 cursor-pointer ${
                  darkTheme ? "bg-dark-secondary hover:bg-dark-hover" : "bg-light-secondary hover:bg-light-hover"
                }`}
                onClick={() => openRiskDetails(riskItem)}
              >
                <h3
                  className={`text-lg font-semibold mb-2 truncate ${
                    darkTheme ? "text-dark-accent" : "text-light-accent"
                  }`}
                  title={riskItem.appName}
                >
                  {riskItem.appName}
                </h3>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2">
                  <CircularProgressbar
                    value={riskItem.degree}
                    text={`${riskItem.degree}%`}
                    styles={buildStyles({
                      textSize: "12px",
                      textColor: getRiskColor(riskItem.degree),
                      pathColor: getRiskColor(riskItem.degree),
                      trailColor: darkTheme ? "#44395A" : "#E0D7F2",
                    })}
                  />
                </div>
                {/* You can choose to display less info here for the smaller card */}
                <p className="text-sm text-center">Risk: {Math.round(riskItem.degree)}%</p>
              </div>
            ))}
          </div>

          {/* Render the modal */}
          <RiskDetailsModal
            isOpen={isModalOpen}
            onClose={closeRiskDetails}
            riskItem={selectedRiskItem}
            darkTheme={darkTheme}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;