import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="relative flex justify-between items-center p-4 bg-[#071952] text-white shadow-md">
      <div className="text-lg font-bold">Prev Guard</div>
      
      <button onClick={toggleMenu} className="focus:outline-none">
        <MoreVertical size={24} />
      </button>
      
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black backdrop-blur-sm"
          ></motion.div>
        )}
      </AnimatePresence>
      
      {/* Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-white text-black shadow-lg p-6 flex flex-col space-y-4"
          >
            <button onClick={toggleMenu} className="self-end text-gray-600">✖</button>
            <a href="/" className="text-lg hover:text-blue-500">Home</a>
            <a href="#" className="text-lg hover:text-blue-500">Profile</a>
            <a href="#" className="text-lg hover:text-blue-500">Settings</a>
            <a href="#" className="text-lg hover:text-red-500">Logout</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
