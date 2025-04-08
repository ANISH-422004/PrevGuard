import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deriveKeyFromPIN, decryptData } from "../../utils/cryptoUtils";
import axiosInstance from "../../config/axios/axios";
import { X } from "lucide-react";

export default function VaultUnlockModal({ isOpen, onSuccess, onCancel }) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnlock = async (e) => {
    e.preventDefault();

    if (pin.length < 4 || pin.length > 6) {
      toast.error("PIN must be 4–6 digits");
      return;
    }

    setLoading(true);
    try {
      const key = await deriveKeyFromPIN(pin);

      const res = await axiosInstance.get("/api/vault/getDummy");
      const dummyItem = res.data;

      if (!dummyItem) {
        toast.error("Vault data not found.");
        return;
      }

      const decrypted = await decryptData(dummyItem.encryptedData, key);

      if (decrypted === "Vault initialized") {
        onSuccess(); // 👈 Vault is now unlocked!
      } else {
        toast.error("Invalid PIN.");
      }
    } catch (err) {
      toast.error("Failed to unlock Vault.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className="relative p-6 rounded-2xl shadow-lg w-[90%] max-w-md 
              bg-light-background text-light-primaryText dark:bg-dark-background dark:text-dark-primaryText"
      >
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 
                text-light-primaryText hover:text-light-hover 
                dark:text-dark-primaryText dark:hover:text-dark-hover"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-2">🔐 Unlock Your Vault</h2>

        <p className="text-sm mb-4 text-light-secondaryText dark:text-dark-secondaryText">
          Enter your 4–6 digit PIN to unlock the Vault.
        </p>

        <form onSubmit={handleUnlock} className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            className="w-full p-2 rounded-xl 
                   bg-light-secondary text-light-primaryText placeholder-light-secondaryText
                   dark:bg-dark-secondary dark:text-dark-primaryText dark:placeholder-dark-secondaryText"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl font-semibold text-white 
                   bg-light-action hover:bg-light-hover 
                   dark:bg-dark-action dark:hover:bg-dark-hover"
          >
            {loading ? "Unlocking..." : "Unlock Vault"}
          </button>
        </form>
      </div>
    </div>
  );
}
