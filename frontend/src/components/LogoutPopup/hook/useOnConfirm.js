import { toast } from "react-toastify";
import { removeUser } from "../../../app/slices/userSlice";

  const useOnconfirm = (dispatch,navigate) => {
    // Handle logout confirmation logic here
    localStorage.removeItem("token"); // Clear user data from local storage
    dispatch(removeUser())
    toast.success("Logged out successfully", {
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
      navigate("/"); // Redirect to login page or home page
    }, 1000);    
  };

  export default useOnconfirm;