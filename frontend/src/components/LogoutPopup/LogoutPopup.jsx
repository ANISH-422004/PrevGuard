import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { HiX } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useOnconfirm from "./hook/useOnConfirm";

const LogoutPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border shadow-lg rounded-lg p-6 w-80">
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg text-light-primaryText dark:text-dark-primaryText hover:text-light-accent dark:hover:text-dark-accent transition"
        >
          <HiX />
        </button>

        {/* Confirmation Text */}
        <h3 className="text-lg font-semibold text-center text-light-primaryText dark:text-dark-primaryText">
          Are you sure you want to logout?
        </h3>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => {
              useOnconfirm(dispatch, navigate);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 text-lg bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Yes, Logout <IoIosLogOut />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-lg bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
