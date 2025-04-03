import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiBoomerangSun } from "react-icons/gi";
import { RiMoonClearFill } from "react-icons/ri";
import { toggleTheme } from "../app/slices/ThemeSlice";

const ThemeButton = () => {
  const { darkTheme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`rounded-full transition-all duration-500 transform ${
        darkTheme
          ? "bg-dark-secondary text-dark-primaryText scale-110 rotate-[360deg]"
          : "bg-light-secondary text-light-primaryText scale-100 rotate-0"
      } p-1 lg:p-3 shadow-md hover:scale-300 hover:shadow-lg`}
    >
      {darkTheme ? (
        <RiMoonClearFill className="text-xl text-light-accent transition-all duration-500" />
      ) : (
        <GiBoomerangSun className="text-xl text-dark-accent transition-all duration-500" />
      )}
    </button>
  );
};

export default ThemeButton;
