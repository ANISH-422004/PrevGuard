import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Unauthorized = () => {
  const { darkTheme } = useSelector((state) => state.theme);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 ${
        darkTheme
          ? "bg-dark-background text-dark-primaryText"
          : "bg-light-background text-light-primaryText"
      }`}
    >
      <div className="bg-secondary bg-opacity-40 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">403 - Unauthorized</h1>
        <p className="mb-6">You do not have permission to access this page.</p>
        <Link
          to="/"
          className="px-6 py-2 rounded-md bg-blue-500 text-white text-lg hover:bg-blue-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
