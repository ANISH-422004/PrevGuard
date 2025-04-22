import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import ThemeButton from "../../components/ThemeButton";
import Logo from "../../assets/PrevGuard.svg";
import SideBar from "../SideBar/SideBar";
import { PiSignInDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../config/axios/axios";
import { setUser } from "../../app/slices/userSlice";
import { motion } from "framer-motion";
import clsx from "clsx"; // Optional, for cleaner conditional classes

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const { darkTheme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  //for Disappearing navBar
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Scrolling down - hide navbar
      setShow(false);
      clearTimeout(timeoutId);
    } else {
      // Scrolling up - delay showing navbar
      clearTimeout(timeoutId);
      const id = setTimeout(() => setShow(true), 200); // Delay in ms
      setTimeoutId(id);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const isUserLoggedIn = async () => {
      axiosInstance
        .get("/api/auth/authme")
        .then((res) => {
          dispatch(setUser(res.data.user));
        })
        .catch((e) => {
          console.log(e);
          dispatch(setUser(null));
        });
    };
    isUserLoggedIn();
  }, []);

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-lg shadow-md flex justify-between items-center px-3 py-2 md:px-4 md:py-3 lg:p-4 z-50 border-b border-light-border dark:border-dark-border "
        initial={{ y: 0, opacity: 1 }}
        animate={show ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          duration: 0.3,
        }}
      >
        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-4">
          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-light-primaryText dark:text-dark-primaryText text-lg md:text-xl lg:text-2xl hover:text-light-accent dark:hover:text-dark-accent transition"
            variants={itemVariants}
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiMenu />
          </motion.button>

          <motion.div variants={itemVariants}>
            <Link to={"/"}>
              <motion.img
                src={Logo}
                alt="PrevGuard Logo"
                className="h-7 md:h-8 lg:h-10"
                variants={logoVariants}
                whileHover="hover"
              />
            </Link>
          </motion.div>
        </div>

        {/* Center Title */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <Link
            to={"/"}
            className="hidden md:block text-lg lg:text-xl font-semibold text-light-primaryText dark:text-dark-primaryText bg-gradient-to-r from-light-accent to-light-action dark:from-dark-accent dark:to-dark-action bg-clip-text text-transparent"
          >
            PrivGuard
          </Link>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex items-center gap-2 md:gap-4"
          variants={itemVariants}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeButton />
          </motion.div>

          {user ? (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/profile">
                <motion.img
                  src={user.profilePicture}
                  alt="Profile"
                  className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full border border-light-accent dark:border-dark-accent cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{
                    boxShadow: `0 0 8px ${darkTheme ? "#A66CFF" : "#874CCC"}`,
                  }}
                />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="flex gap-2 items-center"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="text-xs md:text-sm text-light-primaryText dark:text-dark-primaryText hover:text-light-accent dark:hover:text-dark-accent mt-1 transition"
                >
                  New? here!
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login">
                  <PiSignInDuotone
                    className={`inline-block h-8 w-8 rounded-full ${
                      darkTheme ? "text-[#E3DFFD]" : "text-[#241847]"
                    }`}
                  />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.nav>

      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default NavBar;
