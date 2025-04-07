import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../config/axios/axios";

const useVaultSalt = () => {
  const [salt, setSalt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrCreateSalt = async () => {
      try {
        const res = await axiosInstance.get("api/vault/salt");
        setSalt(res.data.salt);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 404) {
          try {
            const createRes = await axiosInstance.post("api/vault/salt");
            setSalt(createRes.data.salt);
            toast.success("Vault salt generated!");
          } catch (createErr) {
            console.error(createErr);
            toast.error("Error generating vault salt.");
          }
        } else {
          toast.error("Error fetching vault salt.");
        }
        setLoading(false);
      }
    };

    fetchOrCreateSalt();
  }, []);

  return { salt, loading };
};

export default useVaultSalt;
