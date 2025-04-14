import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios/axios";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  setSharedAppsData,
  addSharedApp,
  removeSharedApp,
  updateSharedAppLocal,
} from "../../app/slices/sharedAppsSlice";



const SharedApps = () => {
  const { darkTheme } = useSelector((state) => state.theme);

  const sharedApps = useSelector((state) => state.sharedApps.sharedApps);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingApp, setEditingApp] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newAppData, setNewAppData] = useState({
    appName: "",
    accessDate: "",
    sharedData: {
      email: false,
      password: false,
      phoneNumber: false,
      location: false,
      aadhaarNumber: false,
    },
  });
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleNewToggle = (field) => {
    setNewAppData((prev) => ({
      ...prev,
      sharedData: {
        ...prev.sharedData,
        [field]: !prev.sharedData[field],
      },
    }));
  };

  const createSharedApp = async () => {
    try {
      const res = await axiosInstance.post(
        "/api/sharedApps",
        {
          appName: newAppData.appName,
          accessDate: newAppData.accessDate,
          sharedData: newAppData.sharedData,
        },
      );
      dispatch(addSharedApp(res.data));
      setShowCreateModal(false);
      setNewAppData({
        appName: "",
        accessDate: "",
        sharedData: {
          email: false,
          password: false,
          phoneNumber: false,
          location: false,
          aadhaarNumber: false,
        },
      });
    } catch (err) {
      console.error("Create failed:", err);
    }
  };
  

  useEffect(() => {
    fetchSharedApps();
  }, []);

  const fetchSharedApps = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/api/sharedApps", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setSharedAppsData(res.data));
    } catch (err) {
      setError("Failed to load shared apps");
    } finally {
      setLoading(false);
    }
  };

  const deleteApp = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/api/sharedApps/${id}`);
      dispatch(removeSharedApp(id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  

  const openEditModal = (app) => {
    setEditingApp(app);
    setUpdatedData(app.sharedData);
    setShowModal(true);
  };

  const handleToggle = (field) => {
    setUpdatedData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const updateSharedApp = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.put(
        `/api/sharedApps/${editingApp._id}`,
        {
          sharedData: updatedData,
        },

      );
      dispatch(updateSharedAppLocal({ ...editingApp, sharedData: updatedData }));
      setShowModal(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };
  

  return (
    <div
      className={`min-h-screen px-4 py-10 ${
        darkTheme
          ? "bg-dark-background text-dark-primaryText"
          : "bg-light-background text-light-primaryText"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-8">Shared Apps</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + New App
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sharedApps.map((app) => (
          <motion.div
            key={app._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all ${
              darkTheme
                ? "bg-dark-secondary text-dark-secondaryText hover:bg-dark-hover"
                : "bg-light-secondary text-light-secondaryText hover:bg-light-hover"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-2 ${
                darkTheme ? "text-dark-accent" : "text-light-accent"
              }`}
            >
              {app.appName}
            </h2>
            <div className="text-sm space-y-1">
              {Object.entries(app.sharedData).map(([key, value]) => (
                <p key={key}>
                  {key}:{" "}
                  {value ? (
                    <span className="text-green-500">✅ Shared</span>
                  ) : (
                    <span className="text-red-500">❌ Not Shared</span>
                  )}
                </p>
              ))}
              <p className="text-xs mt-2">
                Accessed: {new Date(app.accessDate).toLocaleDateString()}
              </p>
              {app.lastAccessed && (
                <p className="text-xs">
                  Last Accessed:{" "}
                  {new Date(app.lastAccessed).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => openEditModal(app)}
                className={`px-3 py-1 rounded transition ${
                  darkTheme
                    ? "bg-dark-action text-white hover:bg-dark-hover"
                    : "bg-light-action text-light-primaryText hover:bg-light-hover"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => deleteApp(app._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Creating Shared App */}
      {showCreateModal && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
            darkTheme ? "bg-dark-background" : "bg-light-background"
          }`}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rounded-xl p-6 w-full max-w-md shadow-lg ${
              darkTheme
                ? "bg-dark-secondary text-dark-primaryText"
                : "bg-light-secondary text-light-primaryText"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Create Shared App</h2>
            <input
              type="text"
              placeholder="App Name"
              value={newAppData.appName}
              onChange={(e) =>
                setNewAppData({ ...newAppData, appName: e.target.value })
              }
              className={`w-full mb-3 px-3 py-2 rounded ${
                darkTheme
                  ? "bg-dark-input border border-gray-700 text-black"
                  : "bg-light-input border border-gray-300 text-black"
              }`}
            />
            <input
              type="date"
              value={newAppData.accessDate}
              onChange={(e) =>
                setNewAppData({ ...newAppData, accessDate: e.target.value })
              }
              className={`w-full mb-4 px-3 py-2 rounded ${
                darkTheme
                  ? "bg-dark-input border border-gray-700 text-white"
                  : "bg-light-input border border-gray-300 text-black"
              }`}
            />
            <div className="space-y-2">
              {Object.entries(newAppData.sharedData).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span>{key}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNewToggle(key)}
                    className="h-4 w-4"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-1 rounded bg-gray-600 hover:bg-gray-800 text-white"
              >
                Cancel
              </button>
              <button
                onClick={createSharedApp}
                className="px-4 py-1 rounded bg-green-600 hover:bg-green-700 text-white"
              >
                Create
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal for Editing Shared App */}
      {showModal && editingApp && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
            darkTheme ? "bg-dark-background" : "bg-light-background"
          }`}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rounded-xl p-6 w-full max-w-md shadow-lg ${
              darkTheme
                ? "bg-dark-secondary text-dark-primaryText"
                : "bg-light-secondary text-light-primaryText"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">
              Edit Shared Data - {editingApp.appName}
            </h2>
            <div className="space-y-2">
              {Object.entries(updatedData).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span>{key}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleToggle(key)}
                    className="h-4 w-4"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 rounded bg-gray-600 hover:bg-gray-800 text-white"
              >
                Cancel
              </button>
              <button
                onClick={updateSharedApp}
                className={`px-4 py-1 rounded transition ${
                  darkTheme
                    ? "bg-dark-action hover:bg-dark-hover text-white"
                    : "bg-light-action hover:bg-light-hover text-light-primaryText"
                }`}
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SharedApps;
