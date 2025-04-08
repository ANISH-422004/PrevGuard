import { useEffect, useState } from "react";
import axiosInstance from "../../../config/axios/axios";
import { Fish } from "lucide-react";

// Inside Vault component:
export const useIsFirstTimeUser = () => {
    const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const checkFirstTimeUser = async () => {
        try {
            const response = await axiosInstance.get("/api/vault/getall");
            console.log(response)
            if (response.data?.vaultItems.length === 0) {
                setIsFirstTimeUser(true);
            } else {
                setIsFirstTimeUser(false);
            }
        } catch (error) {
            console.error("Error checking first time user:", error);
        } finally {
            setLoading(false);
        }
        };
    
        checkFirstTimeUser();
    }, []);
    
    return { isFirstTimeUser, loading };
}