import React from 'react';
import { Link } from 'react-router-dom'; // for navigation between pages
import ThemeButton from '../../components/ThemeButton';

// Placeholder for PrevGuard, which could be a component to check for user auth status
const PrevGuard = () => {
  // Here, you'd have logic to check if the user is authenticated.
  // If not authenticated, you could redirect them to a login page.
  return null; // Currently no logic, can be extended for authentication check.
};

const Home = () => {
  return (
    <div className="bg-light min-h-screen ">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-6 bg-[#071952] text-white p-4  ">
        <div className="text-primary font-semibold text-lg">
          <Link to="/">Home</Link>
        </div>
        <ThemeButton/>
        <div className="flex gap-4">
          <Link to="/login" className="text-primary hover:text-secondary">Login</Link>
          <Link to="/register" className="text-primary hover:text-secondary">Sign Up</Link>
        </div>
      </nav>

      {/* PrevGuard */}
      <PrevGuard />

      {/* Main Content */}
      <div className="flex justify-center items-center flex-col text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Welcome to Our Website</h1>
        <p className="text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
        </p>
        
        {/* Example Buttons */}
        <div className="flex gap-4">
          <Link
            to="/login"
            className="btn-primary py-2 sm:py-3"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn-secondary py-2 sm:py-3"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
