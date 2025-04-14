// src/redux/actions/breachActions.js
import { setBreaches } from "../slices/breachSlice";
import axiosInstance from "../../config/axios/axios";
import { toast } from "react-toastify";

export const fetchBreaches = () => async (dispatch, getState) => {
  try {
    const response = await axiosInstance.get("https://api.xposedornot.com/v1/breaches");
    dispatch(setBreaches(response.data.exposedBreaches));
  } catch (error) {
    console.error("Failed to fetch breaches:", error);
    toast.error("Failed to fetch breaches. Please try again later.");
  }
};
