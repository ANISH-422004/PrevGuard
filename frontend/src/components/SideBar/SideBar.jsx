import React from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";

const SideBar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for Glass Effect */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } z-40`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-light-secondary/40 dark:bg-dark-secondary/40 backdrop-blur-xl border-l border-light-border dark:border-dark-border shadow-2xl transform ${
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
          <Link to="/dashboard" className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition">Dashboard</Link>
          <Link to="/profile" className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition">Profile</Link>
          <Link to="/shared-data" className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition">Shared Data</Link>
          <Link to="/fake-data" className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition">Fake Data Generator</Link>
          <Link to="/breach-check" className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition">Breach Monitoring</Link>
          <Link to="/privacy-tips" className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition">Privacy Tips</Link>
          <Link to="/vault" className="text-lg hover:text-light-accent dark:hover:text-dark-accent transition">Data Vault</Link>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
