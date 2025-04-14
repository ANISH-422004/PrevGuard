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

const Dashboard = () => {
  const { darkTheme } = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const breaches = useSelector((state) => state.breaches.data);
  const sharedApps = useSelector((state) => state.sharedApps.sharedApps);
  const dispatch = useDispatch(); 
  const risk = mapAppsToRisk(sharedApps, breaches);


  


  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // 1) fetch shared apps
        const res = await axiosInstance.get("/api/sharedApps");
        dispatch(setSharedAppsData(res.data));

        // 2) fetch breaches
        await dispatch(fetchBreaches());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [dispatch]);

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



</>
      )}
    </div>
  );
};

export default Dashboard;
