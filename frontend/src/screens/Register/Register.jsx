import React, { useState } from "react";
import PasswordStrength from "./Register componets/PasswordStrength";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axiosInstance from "../../config/axios/axios";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/Loading";

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
      // console.log(formData);
      const { firstName, lastName, email, password, phoneNumber } = formData;
      // Validate input
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
          // transition: Bounce,
          });
          setIsLoading(false);
        return;
      }

      const response = await axiosInstance.post("api/auth/register", formData);

      console.log(response);

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        toast.success("User registered successfully Now Verify the Email" , {
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
          navigate("/otp" , { state: { email: formData.email } });
        }, 1500);

      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.errors.join(", ") || "An error occurred";
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
        // transition: Bounce,
        });
        setIsLoading(false);
    
      }
  };

  return (
    <div className="flex p-4 items-center justify-center min-h-screen bg-[#071952] relative ">
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
          <button
            onClick={(e) => {
              handelRegisterUser(e);
            }}
            className="w-full mt-4 p-2 bg-[#088395] text-[#EBF4F63 rounded-full hover:bg-[#37B7C3]"
          >
            {isLoading ? (
              <Loading/> ) : (
              "Sign Up"
              )  
            }
          </button>
          <ToastContainer />
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
