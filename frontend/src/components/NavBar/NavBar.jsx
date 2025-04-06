import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi"; // Sidebar toggle icon
import ThemeButton from "../../components/ThemeButton";
import Logo from "../../assets/PrevGuard.svg"; // Your logo
import SideBar from "../SideBar/SideBar";
import { PiSignInDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../config/axios/axios";
import { setUser } from "../../app/slices/userSlice";
const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user.user); // Replace with actual auth logic
  const { darkTheme } = useSelector((state) => state.theme); // Assuming you have a theme slice in your Redux store
  const dispatch = useDispatch();

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

  return (
    <>
      <nav className="top-0 left-0 w-full bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-lg shadow-md flex justify-between items-center px-3 py-2 md:px-4 md:py-3 lg:p-4 z-50 ">
        {/* Left Section: Sidebar Toggle & Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Sidebar Toggle Button - prop drilled */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-light-primaryText dark:text-dark-primaryText text-lg md:text-xl lg:text-2xl hover:text-light-accent dark:hover:text-dark-accent transition"
          >
            <HiMenu />
          </button>

          {/* Logo */}
          <Link to={"/"}>
            <img
              src={Logo}
              alt="PrevGuard Logo"
              className="h-7 md:h-8 lg:h-10"
            />
          </Link>
        </div>

        {/* Center Section: Page Title (Hidden on Small Screens) */}
        <Link
          to={"/"}
          className="hidden md:block text-lg lg:text-xl font-semibold text-light-primaryText dark:text-dark-primaryText"
        >
          PrevGuard
        </Link>

        {/* Right Section: Theme Toggle + Profile/Login */}
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeButton />

          {user ? (
            <Link to="/profile">
              <img
                src={user.profilePicture} // Replace with real user image
                alt="Profile"
                className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full border border-light-accent dark:border-dark-accent cursor-pointer hover:scale-105 transition"
              />
            </Link>
          ) : (
            <div className="flex  gap-2 items-center">
              <Link
                to="/register"
                className="text-xs md:text-sm text-light-primaryText dark:text-dark-primaryText hover:text-light-accent dark:hover:text-dark-accent mt-1 transition"
              >
                New? here!
              </Link>
              <Link to="/login" className="">
                <PiSignInDuotone
                  className={`inline-block h-8 w-8 rounded-full ${
                    darkTheme ? "text-[#E3DFFD]" : "text-[#241847]"
                  }`}
                />
              </Link>
            </div>
          )}
        </div>
      </nav>
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default NavBar;
