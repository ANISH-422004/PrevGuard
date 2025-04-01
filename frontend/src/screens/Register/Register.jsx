import React, { useState } from "react";
import PasswordStrength from "./Register componets/PasswordStrength";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    agree: false,
  });
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
    <div className="flex items-center justify-center min-h-screen bg-[#071952] relative ">
      <div className="absolute top-1 left-1">
      <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#37B7C3] mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>
      
      <div className="w-96 p-3 bg-[#071952] rounded-lg ">

        <h2 className="text-xl font-bold text-[#EBF4F6] mb-4">Sign Up</h2>
        <form>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 rounded-full border border-[#37B7C3] bg-transparent text-[#EBF4F6] focus:border-gray-500"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 rounded-full border border-[#37B7C3] bg-transparent text-[#EBF4F6] focus:border-gray-500"
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mt-3 p-2 rounded-full border border-[#37B7C3] bg-transparent text-[#EBF4F6] focus:border-gray-500"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
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

          {/* Strong strength Meter */}

          <PasswordStrength password={formData.password} />

          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mr-2"
            />

            <label htmlFor="agree" className="text-[#EBF4F6]">
              I Agree with <span className="text-[#088395]">privacy</span> and{" "}
              <span className="text-[#088395]">policy</span>
            </label>
          </div>
          <button className="w-full mt-4 p-2 bg-[#088395] text-[#EBF4F63 rounded-full hover:bg-[#37B7C3]">
            Sign up
          </button>
        </form>
        <p className="text-[#EBF4F6] mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-[#37B7C3]">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
