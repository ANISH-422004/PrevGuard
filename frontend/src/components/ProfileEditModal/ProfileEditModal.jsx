import React, { useState } from "react";
import axiosInstance from "../../config/axios/axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { setUser } from "../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";


export default function ProfileEditModal({ user, onClose, onUpdate }) {
  const [username, setUsername] = useState(user.username);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); // Assuming you have a Redux store to manage user state
  const { darkTheme } = useSelector((state) => state.theme); // Assuming you have a Redux store with a theme slice

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("phoneNumber", phoneNumber);
    if (image) formData.append("profilePicture", image);
  
    try {
      setLoading(true);
      const res = await axiosInstance.put("/api/user/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpdate(res.data);
      toast.success("Profile updated successfully!");
      dispatch(setUser(res.data.user));
      onClose();
    } catch (error) {
      console.error("Profile update failed", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-dark-secondary text-black dark:text-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="px-4 py-2 rounded-md border dark:bg-dark-background"
            required
          />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="px-4 py-2 rounded-md border dark:bg-dark-background"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="text-sm"
          />
          <input
            type="email"
            value={user.email}
            readOnly
            className="px-4 py-2 rounded-md border bg-gray-200 cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
