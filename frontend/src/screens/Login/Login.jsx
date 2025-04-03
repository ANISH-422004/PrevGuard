import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios/axios";
import { removeUser } from "../../app/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch(); 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { darkTheme } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData)

  const handleLogin = async (e) => {
    e.preventDefault(); // FIX: Prevent default form submission
    setLoading(true);
    console.log(formData)
    try {
      const response = await axiosInstance.post("/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json", // Ensures proper JSON format
        },
      });
      
      console.log(response.data)
      localStorage.setItem("token", response.data.token); // Save token
      toast.success("Login Successful!");
      dispatch(removeUser(response.data.user));
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        darkTheme ? "bg-dark-background text-dark-primaryText" : "bg-light-background text-light-primaryText"
      }`}
    >
      <div
        className={`w-96 p-6 rounded-lg shadow-lg ${
          darkTheme ? "bg-dark-secondary border border-dark-border" : "bg-light-secondary border border-light-border"
        }`}
      >
        <h2 className="text-xl font-bold text-center mb-6">Log In</h2>
        <form onSubmit={handleLogin}> {/* FIX: Use onSubmit */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 rounded-md border border-gray-500 focus:outline-none bg-transparent"
          />

          <div className="relative mt-4">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 rounded-md border border-gray-500 focus:outline-none bg-transparent"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2 cursor-pointer text-sm hover:opacity-75 transition"
            >
              {passwordVisible ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit" // FIX: Ensure button submits the form
            className="w-full mt-6 p-2 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="underline hover:opacity-75">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
