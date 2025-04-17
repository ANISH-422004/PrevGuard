import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import LogoutPopup from "../LogoutPopup/LogoutPopup"; // Import the modal
import { useSelector } from "react-redux";

const SideBar = ({ isOpen, onClose }) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const user = useSelector((state) => state.user.user); // Replace with actual auth logic

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } z-40`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-48 md:w-64 bg-light-secondary/40 dark:bg-dark-secondary/40 backdrop-blur-xl border-l border-light-border dark:border-dark-border shadow-2xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-2xl text-light-primaryText dark:text-dark-primaryText hover:text-light-accent dark:hover:text-dark-accent transition"
          >
            <HiX />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4 p-4 text-white dark:text-dark-primaryText">
          <Link
            onClick={onClose}
            to="/password-strength-checker"
            className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition"
          >
            Password Strength Checker
          </Link>
          <Link
            onClick={onClose}
            to="/profile"
            className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition"
          >
            Profile
          </Link>
          <Link
            onClick={onClose}
            to="/shared-data"
            className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition"
          >
            Shared Data
          </Link>
          <Link
            onClick={onClose}
            to="/fake-data"
            className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition"
          >
            Fake Data Generator
          </Link>
          <Link
            onClick={onClose}
            to="/breach-check"
            className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition"
          >
            Breach Monitoring
          </Link>
          <Link
            onClick={onClose}
            to="/privacy-tips"
            className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition"
          >
            Privacy Tips
          </Link>
          <Link
            onClick={onClose}
            to="/vault"
            className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition"
          >
            Data Vault
          </Link>

          {/* Logout Button - Opens Popup */}
          {user ? (
            <button
              onClick={() => setShowLogoutPopup(true)}
              className="flex items-center gap-2 px-4 py-2 text-lg bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout <IoIosLogOut />
            </button>
          ) : null}
        </nav>
      </div>

      {/* Logout Popup */}
      <LogoutPopup
        isOpen={showLogoutPopup}
        onClose={() => setShowLogoutPopup(false)}
        onConfirm={() => {
          console.log("User logged out!"); // Replace with actual logout logic
          setShowLogoutPopup(false);
        }}
      />
    </>
  );
};

export default SideBar;
