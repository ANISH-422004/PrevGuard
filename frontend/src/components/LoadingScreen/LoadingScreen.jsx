import React from "react";
import { useSelector } from "react-redux";
import loader from "../../assets/loader.svg"; // Import the SVG properly

const LoadingScreen = () => {
  const { darkTheme } = useSelector((state) => state.theme);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        darkTheme
          ? "bg-dark-background text-dark-primaryText"
          : "bg-light-background text-light-primaryText"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Custom SVG Loader */}
        <img src={loader} alt="Loading..." className="w-32 h-32" />

        <p className="mt-4 text-lg font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
