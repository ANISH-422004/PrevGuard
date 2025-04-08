import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { deriveKeyFromPIN, encryptData } from "../../utils/cryptoUtils";
import axiosInstance from "../../config/axios/axios";

// ✅ Only style changes – logic untouched

export default function VaultSetupModal({ isOpen }) {
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isOpen) {
        toast.info("Vault setup cancelled, redirecting...");
        navigate("/dashboard");
      }
    }, [isOpen]);
  
    const handleClose = () => {
      toast.info("Vault setup cancelled, redirecting...");
      navigate("/dashboard");
    };
  
    const handleSetup = async (e) => {
      e.preventDefault();
      if (pin !== confirmPin) {
        toast.error("PINs do not match");
        return;
      }
      if (pin.length < 4 || pin.length > 6) {
        toast.error("PIN must be 4–6 digits");
        return;
      }
  
      try {
        const key = await deriveKeyFromPIN(pin);
        const encryptedDummy = await encryptData("Vault initialized", key);
  
        await axiosInstance.post("/api/vault/add", {
          title: "Vault Initialized",
          encryptedData: encryptedDummy,
          isDummy: true,
        });
  
        toast.success("Vault initialized 🎉");
        navigate("/vault");
      } catch (err) {
        toast.error("Failed to setup Vault");
        console.error(err);
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="relative w-[90%] max-w-md p-6 rounded-2xl shadow-2xl border bg-light-background text-light-primaryText border-light-accent dark:bg-dark-background dark:text-dark-primaryText dark:border-dark-accent">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-light-secondaryText hover:text-light-accent dark:text-dark-secondaryText dark:hover:text-dark-accent transition"
          >
            <X size={22} />
          </button>
  
          <h2 className="text-2xl font-bold mb-2">🔐 Setup Your Vault</h2>
          <p className="text-sm text-light-secondaryText dark:text-dark-secondaryText mb-4">
            Set a 4–6 digit PIN to unlock your Vault. <br />
            <span className="text-red-500 font-semibold">
              If you lose your PIN, you will lose access to all saved passwords!
            </span>
          </p>
  
          <form onSubmit={handleSetup} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full p-3 rounded-xl bg-light-secondary text-light-primaryText placeholder-light-secondaryText dark:bg-dark-secondary dark:text-dark-primaryText dark:placeholder-dark-secondaryText outline-none"
            />
            <input
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              placeholder="Confirm PIN"
              className="w-full p-3 rounded-xl bg-light-secondary text-light-primaryText placeholder-light-secondaryText dark:bg-dark-secondary dark:text-dark-primaryText dark:placeholder-dark-secondaryText outline-none"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-xl font-semibold text-white bg-light-action hover:bg-light-hover dark:bg-dark-action dark:hover:bg-dark-hover transition-all"
            >
              Setup Vault
            </button>
          </form>
        </div>
      </div>
    );
}
  
