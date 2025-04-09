import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../config/axios/axios";
import { useSelector } from "react-redux";

const AddPasswordModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !password) {
      toast.error("App name and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/vault/add", {
        title,
        username,
        password,
      });

      onSuccess?.({
        title,
        username,
        password,
      });
      onClose?.();

      // Reset inputs
      setTitle("");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save password");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`relative w-[90%] max-w-md p-6 rounded-2xl shadow-xl border ${
          darkTheme
            ? "bg-dark-background text-dark-primaryText border-dark-hover"
            : "bg-light-background text-light-primaryText border-light-hover"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 transition-colors ${
            darkTheme
              ? "text-dark-secondaryText hover:text-dark-accent"
              : "text-light-secondaryText hover:text-light-accent"
          }`}
        >
          <X size={22} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-2">➕ Add New Password</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="App / Site Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-3 rounded-xl outline-none ${
              darkTheme
                ? "bg-dark-secondary text-dark-primaryText placeholder-dark-secondaryText"
                : "bg-light-secondary text-light-primaryText placeholder-light-secondaryText"
            }`}
          />
          <input
            type="text"
            placeholder="Username (optional)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-3 rounded-xl outline-none ${
              darkTheme
                ? "bg-dark-secondary text-dark-primaryText placeholder-dark-secondaryText"
                : "bg-light-secondary text-light-primaryText placeholder-light-secondaryText"
            }`}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 rounded-xl outline-none ${
              darkTheme
                ? "bg-dark-secondary text-dark-primaryText placeholder-dark-secondaryText"
                : "bg-light-secondary text-light-primaryText placeholder-light-secondaryText"
            }`}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl font-semibold transition-all ${
              darkTheme
                ? "bg-dark-action hover:bg-dark-hover text-white"
                : "bg-light-action hover:bg-light-hover text-white"
            }`}
          >
            {loading ? "Saving..." : "Save Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPasswordModal;
