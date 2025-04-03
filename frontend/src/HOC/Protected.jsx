import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../config/axios/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../app/slices/userSlice";
import Unauthorized from "../components/Unauthorized";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const Protected = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token inside useEffect

    if (!token) {
      toast.error("Unauthorized! Redirecting to login...");
      setTimeout(() => navigate("/"), 500);
      setIsAuthorized(false);
      setIsLoading(false);
      return;
    }

    let isMounted = true; // Prevent state updates after unmount

    axiosInstance
      .get("/api/auth/authme")
      .then((res) => {
        if (isMounted) {
          dispatch(setUser(res.data.user));
          setIsAuthorized(true);
        }
      })
      .catch((err) => {
        if (isMounted) {
          const errorMessage = err.response?.data?.message || "An error occurred. Try logging in again.";
          toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
          setTimeout(() => navigate("/"), 500);
          setIsAuthorized(false);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [dispatch, navigate]);

  if (isLoading) return <LoadingScreen />; 
  if (!isAuthorized) return <Unauthorized />;

  return children;
};

export default Protected;
