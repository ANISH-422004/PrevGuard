import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../config/axios/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../app/slices/userSlice";
import Unauthorized from "../components/Unauthorized";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isAuthorized, setIsAuthorized] = useState(false); // Default to false
  const [isLoading, setIsLoading] = useState(true); // Separate loading state


  useEffect(() => {
  console.log(token)

    if (!token) {
      toast.error("Unauthorized! Redirecting to login...");
      setTimeout(() => navigate("/"), 500);
      setIsAuthorized(false);
      setIsLoading(false); // Stop loading
      return;
    }

    axiosInstance
      .get("/api/auth/authme")
      .then((res) => {
        dispatch(setUser(res.data.user));
        setIsAuthorized(true);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.errors?.[0] + " Try logging in again" || "An error occurred",
          { position: "top-right", autoClose: 3000 }
        );
        console.log(err);
        setTimeout(() => navigate("/"), 500);
        setIsAuthorized(false);
      })
      .finally(() => setIsLoading(false)); // Ensure loading stops after API response
  }, [token, dispatch]);

  if (isLoading) return <LoadingScreen />; // Show loading screen while checking auth
  if (!isAuthorized) return <Unauthorized />; // Show unauthorized screen if access is denied
  
  return children; // Render children if authorized
};

export default Protected;
