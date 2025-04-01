import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    agree: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#071952]">
      <div className="absolute top-1 left-1">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#37B7C3] mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>

      <div className="w-96 p-4 bg-[#071952] rounded-lg ">
        <h2 className="text-xl font-bold text-[#EBF4F6] mb-4">Log In</h2>
        <form>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mt-3 p-2 rounded-full border border-[#37B7C3] bg-transparent text-[#EBF4F6] focus:border-gray-500"
          />

          <div className="relative mt-3">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 rounded-full border border-[#37B7C3] bg-transparent text-[#EBF4F6] focus:border-gray-500"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2 text-[#37B7C3] cursor-pointer"
            >
              {passwordVisible ? "Hide" : "Show"}
            </span>
          </div>

          <button className="w-full mt-4 p-2 bg-[#088395] text-[#EBF4F63 rounded-full hover:bg-[#37B7C3]">
            Sign up
          </button>
        </form>
        <p className="text-[#EBF4F6] mt-4 text-center">
          Create a new account?{" "}
          <a href="/login" className="text-[#37B7C3]">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
