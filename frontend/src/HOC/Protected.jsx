import React from "react";
import { toast } from "react-toastify";
import axiosInstance from "../config/axios/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../app/slices/userSlice";

const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
    console.log(token)

  if (!token) {
    toast.error("Unauthorized! Redirecting to login...");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  }

  axiosInstance
    .get("api/user/getuser")
    .then((res) => {
      console.log(res.data);
      dispatch(setUser(res.data.user));
    })
    .catch((err) => {
      console.log(err.response?.data?.errors?.[0] || "An error occurred");
      toast.error(
        err.response?.data?.errors?.[0] + " Try logging in again" ||
          "An error occurred",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    });

  return children;
};

export default Protected;
