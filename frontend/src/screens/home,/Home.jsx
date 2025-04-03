import React from 'react';
import { Link } from 'react-router-dom';
import ThemeButton from '../../components/ThemeButton';
import { useSelector } from 'react-redux';

const Home = () => {
  const { darkTheme } = useSelector((state) => state.theme);

  return (
    <div className={`min-h-screen py-1 ${darkTheme ? "bg-dark-background text-dark-primaryText" : "bg-light-background text-light-primaryText"}`}>

      {/* Main Content */}
      <div className="flex justify-center items-center flex-col text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className={`mb-6 ${darkTheme ? "text-dark-secondaryText" : "text-light-secondaryText"}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link to="/login" className={`py-2 sm:py-3 px-6 rounded-lg ${darkTheme ? "bg-dark-action hover:bg-dark-hover" : "bg-light-action hover:bg-light-hover"}`}>
            Login
          </Link>
          <Link to="/register" className={`py-2 sm:py-3 px-6 rounded-lg ${darkTheme ? "bg-dark-accent hover:bg-dark-hover" : "bg-light-accent hover:bg-light-hover"}`}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
