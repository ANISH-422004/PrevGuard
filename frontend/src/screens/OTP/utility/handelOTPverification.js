import { toast } from "react-toastify";
import axiosInstance from "../../../config/axios/axios";
import { setUser } from "../../../app/slices/userSlice";


const handelOTPverification = async (otp, email, navigate , dispatch) => {
    

    if(!email) {
        toast.error("Please enter a valid email address ", {
            position: "top-right",
            autoClose: 5000,    
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        return;
    }
   
   
    axiosInstance
        .post("/api/otp/verifyotp", { otp, email }) // send otp and email to backend via body
        .then((res) => {
            console.log(res.data);
            if (res.data) {
                localStorage.setItem("token", res.data.token); // store token in local storage
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                console.log(res.data.user);

                dispatch(setUser(res.data.user)); 

                setTimeout(() => {
                    navigate("/password-strength-checker");
                }, 3000);
            }
        })
        .catch((err) => {
            console.log(err.response?.data?.errors?.[0] || "An error occurred");
            toast.error(err.response?.data?.errors?.[0] + " Try Resending OTP to your Email" || "An error occurred", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        });
};


export default handelOTPverification;







