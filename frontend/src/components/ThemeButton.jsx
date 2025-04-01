import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiBoomerangSun } from "react-icons/gi";
import { RiMoonClearFill } from "react-icons/ri";
import { toggleTheme } from "../app/slices/ThemeSlice";

const ThemeButton = () => {
  const { darkTheme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  console.log(darkTheme);
  
  
  return (
    <button
      onClick={() => {
        dispatch(toggleTheme())
      }}
      className={`rounded-full  transition-all duration-150  bg-${darkTheme ? "black" : "white"} text-${
        darkTheme ? "white" : "black"
      } p-2`}
    >
      {darkTheme ? (
        <RiMoonClearFill className="text-xl text-blue-500 " />
      ) : (
        <GiBoomerangSun className="text-xl text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeButton;
