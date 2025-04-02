import axiosInstance from "../../../config/axios/axios";
import { toast } from "react-toastify";

const handelResendOTP = (email) => {

    axiosInstance
        .post("/api/otp/resendotp", { email: email }) // send email to backend via body
        .then((res) => {
            console.log(res.data);
            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });


        })
        .catch((err) => {
            console.log(err.response?.data?.errors?.[0] || "An error occurred");
            toast.error(
                err.response?.data?.errors?.[0] +
                " Try Resending OTP to your Email" || "An error occurred",
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
        });
};

export default handelResendOTP;