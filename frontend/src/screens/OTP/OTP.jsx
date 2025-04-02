import { useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import handelOTPverification from "./utility/handelOTPverification";
import handelResendOTP from "./utility/handelResendOTP";
import { useDispatch } from "react-redux";

const OTP = () => {
  const length = 6;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#071952] p-4">
      <div className="absolute top-1 left-1">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#37B7C3] mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-[#EBF4F6] mb-4">Enter OTP</h2>
      <div className="flex space-x-2 md:space-x-4">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            value={data}
            maxLength="1"
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-12 md:w-14 md:h-14 text-center text-lg md:text-xl border-2 border-[#37B7C3] bg-[#EBF4F6] text-[#071952] rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500 transition"
          />
        ))}
      </div>
      <div>
        <h1 className="text-[#EBF4F6] text-xs font-light mt-4 text-center">
          We Sent a OTP to Email and OTP will be valid for{" "}
          <span className="text-orange-400"> 2 min </span> only !!
        </h1>
      </div>
      <button
        onClick={() => {
          handelOTPverification(otp.join(""), location.state.email, navigate , dispatch);
        }}
        className="mt-6 px-6 py-2 bg-[#088395] text-[#EBF4F6] rounded-lg hover:bg-[#37B7C3] transition"
      >
        Verify OTP
      </button>
      <p className="mt-4 text-[#EBF4F6]">
        Didn’t receive the OTP?{" "}
        <span
          onClick={() => handelResendOTP(location.state.email)}
          className="text-[#37B7C3] cursor-pointer hover:underline hover:text-[#088395]"
        >
          Resend OTP
        </span>
      </p>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default OTP;
