import React, { useState } from "react";
import PasswordStrength from "./Register componets/PasswordStrength";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axiosInstance from "../../config/axios/axios";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";

const Register = () => {
  const [errors, setErrors] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    agree: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { darkTheme } = useSelector((state) => state.theme);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handelRegisterUser = async (e) => {
    setErrors([]);
    setIsLoading(true);
    try {
      e.preventDefault();
      const { firstName, lastName, email, password, phoneNumber } = formData;
      if (!firstName || !lastName || !email || !password || !phoneNumber) {
        setErrors(["All fields are required"]);
        toast.error("All fields are required", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
        return;
      }
      if (!formData.agree) {
        setErrors(["You must agree to the terms and conditions"]);
        toast.error(errors[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
        return;
      }

      const response = await axiosInstance.post("api/auth/register", formData);

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        toast.success("User registered successfully \n Now Verify the Email !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/otp", { state: { email: formData.email } });
        }, 1500);
      }
      setIsLoading(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors.join(", ") || "An error occurred";
      setErrors([errorMessage]);

      toast.error(errors[0], {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex p-4 items-center justify-center min-h-screen relative ${
        darkTheme ? "bg-[#1A102B]" : "bg-[#F2F0FC]"
      }`}
    >


      <div
        className={`w-96 p-3 rounded-lg ${
          darkTheme ? "bg-[#221736]" : "bg-[#DCD6F7]"
        }`}
      >
        <h2 className={`text-xl font-bold mb-4 ${darkTheme ? "text-[#E3DFFD]" : "text-[#241847]"}`}>
          Sign Up
        </h2>
        <form className=""> 
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className={`w-full p-2 rounded-full border ${
                darkTheme ? "border-[#874CCC] text-[#E3DFFD]" : "border-[#874CCC] text-[#241847]"
              } bg-transparent`}
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className={`w-full p-2 rounded-full border ${
                darkTheme ? "border-[#874CCC] text-[#E3DFFD]" : "border-[#874CCC] text-[#241847]"
              } bg-transparent`}
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full mt-3 p-2 rounded-full border ${
              darkTheme ? "border-[#874CCC] text-[#E3DFFD]" : "border-[#874CCC] text-[#241847]"
            } bg-transparent`}
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className={`w-full mt-3 p-2 rounded-full border ${
              darkTheme ? "border-[#874CCC] text-[#E3DFFD]" : "border-[#874CCC] text-[#241847]"
            } bg-transparent`}
          />
          <div className="relative mt-3">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full p-2 rounded-full border ${
                darkTheme ? "border-[#874CCC] text-[#E3DFFD]" : "border-[#874CCC] text-[#241847]"
              } bg-transparent`}
            />
            <span
              onClick={togglePasswordVisibility}
              className={`absolute right-3 top-2 cursor-pointer ${darkTheme ? "text-[#874CCC]" : "text-[#874CCC]"}`}
            >
              {passwordVisible ? "Hide" : "Show"}
            </span>
          </div>

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
            <label htmlFor="agree" className={darkTheme ? "text-[#E3DFFD]" : "text-[#241847]"}>
              I Agree with <span className={darkTheme ? "text-[#874CCC]" : "text-[#874CCC]"}>privacy</span> and{" "}
              <span className={darkTheme ? "text-[#874CCC]" : "text-[#874CCC]"}>policy</span>
            </label>
          </div>
          <button
            onClick={(e) => {
              handelRegisterUser(e);
            }}
            className={`w-full mt-4 p-2 rounded-full ${
              darkTheme ? "bg-[#A66CFF] text-[#E3DFFD]" : "bg-[#A66CFF] text-[#241847]"
            }`}
          >
            {isLoading ? <Loading /> : "Sign Up"}
          </button>
          <ToastContainer />
        </form>
        <p className={`mt-4 text-center ${darkTheme ? "text-[#E3DFFD]" : "text-[#241847]"}`}>
          Already have an account?{" "}
          <Link  to="/login" className={darkTheme ? "text-[#874CCC]" : "text-[#874CCC]"}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;