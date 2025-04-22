import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BadgeCheck,
  Mail,
  Smartphone,
  MapPin,
  KeyRound,
  ShieldAlert,
} from "lucide-react";
import axiosInstance from "../../config/axios/axios"; // Adjust the import path as necessary
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ProfileEditModal from "../../components/ProfileEditModal/ProfileEditModal";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const u = useSelector((state) => state.user.user); // Assuming you have a Redux store with a user slice
  const darkTheme = useSelector((state) => state.theme.darkTheme); // Assuming you have a Redux store with a theme slice
  const handleUpdate = (updatedUser) => setUser(updatedUser);

  useEffect(() => {
    async function fetchuserData() {
      axiosInstance
        .get(`/api/user/${u._id}`)
        .then((res) => setUser(res.data.user))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
    fetchuserData();
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <div
      className={`mx-auto min-h-screen  py-14 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 ${
        darkTheme ? "bg-dark-background text-dark-primaryText" : "bg-light-background text-light-primaryText"
      }`}
    >
      {/* Profile Header */}
      <div
        className={`rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 ${
          darkTheme ? "bg-dark-secondary" : "bg-light-secondary"
        }`}
      >
        <img
          src={user?.profilePicture}
          alt="Profile"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border"
        />
        <div className="text-center sm:text-left">
          <h2
            className={`text-xl sm:text-2xl font-bold flex items-center justify-center sm:justify-start gap-2 ${
              darkTheme ? "text-dark-primaryText" : "text-light-primaryText"
            }`}
          >
            {user.username}
            {user.isVerified && <BadgeCheck className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />}
          </h2>
          <p
            className={`text-sm ${
              darkTheme ? "text-dark-secondaryText" : "text-light-secondaryText"
            }`}
          >
            {user.email}
          </p>
          <p
            className={`text-sm ${
              darkTheme ? "text-dark-secondaryText" : "text-light-secondaryText"
            }`}
          >
            {user.phoneNumber}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Edit Profile
        </button>
      </div>

      {/* Shared Apps */}
      <section className="mt-6 sm:mt-8">
        <h3
          className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${
            darkTheme ? "text-dark-primaryText" : "text-light-primaryText"
          }`}
        >
          Shared Apps
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.sharedData?.map((app) => (
            <div
              key={app._id}
              className={`p-3 sm:p-4 rounded-md sm:rounded-xl shadow-md ${
                darkTheme ? "bg-dark-secondary hover:bg-dark-hover" : "bg-light-secondary hover:bg-light-hover"
              }`}
            >
              <h4
                className={`font-bold text-md sm:text-lg mb-1 sm:mb-2 truncate ${
                  darkTheme ? "text-dark-accent" : "text-light-accent"
                }`}
                title={app.appName}
              >
                {app.appName}
              </h4>
              <div className="flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm">
                {Object.entries(app.sharedData).map(([field, shared]) =>
                  shared ? (
                    <span
                      key={field}
                      className={`${
                        darkTheme ? "bg-green-800 text-white" : "bg-green-100 text-green-800"
                      } px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1`}
                    >
                      {field === "email" && <Mail className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {field === "phoneNumber" && <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {field === "location" && <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {field === "password" && <KeyRound className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {field === "aadhaarNumber" && <ShieldAlert className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {field}
                    </span>
                  ) : null
                )}
              </div>
              <p
                className={`mt-1 sm:mt-2 text-xs sm:text-sm ${
                  darkTheme ? "text-dark-secondaryText" : "text-light-secondaryText"
                }`}
              >
                Accessed on: {new Date(app.accessDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>



      {/* Fake Data */}
      <section className="mt-6 sm:mt-8">
        <h3
          className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${
            darkTheme ? "text-dark-primaryText" : "text-light-primaryText"
          }`}
        >
          Saved Fake Data
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.savedFakeData?.map((fake) => (
            <div
              key={fake._id}
              className={`p-3 sm:p-4 rounded-md sm:rounded-xl shadow-sm ${
                darkTheme ? "bg-dark-secondary" : "bg-light-secondary"
              } ${darkTheme ? "text-dark-primaryText" : "text-light-primaryText"}`}
            >
              <p className="text-sm sm:text-base">
                <strong>Name:</strong> {fake.name}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Phone:</strong> {fake.phone}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Address:</strong> {fake.address}, {fake.city}, {fake.state}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Aadhaar:</strong> {fake.aadhar}
              </p>
            </div>
          ))}
        </div>
      </section>


      {showModal && (
        <ProfileEditModal
          user={user}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}



    </div>
  );
}