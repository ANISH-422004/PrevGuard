import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import axiosInstance from "../../config/axios/axios";
import AddPasswordModal from "../../components/AddPasswordModal";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

const Vault = () => {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [vaultItems, setVaultItems] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId);
    setShowDeleteModal(true);
  };

  console.log(itemToDelete)
  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/api/vault/delete/${itemToDelete}`);
      setVaultItems((prev) => prev.filter((item) => item._id !== itemToDelete));
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const toggleVisibility = (index) => {
    setVisibleIndex(index === visibleIndex ? null : index);
  };

  const handleCopy = (password) => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  useEffect(() => {
    const fetchVaultItems = async () => {
      try {
        const res = await axiosInstance.get("/api/vault/getall");
        setVaultItems(res.data); // Make sure backend returns vaultItems array
      } catch (err) {
        console.error(err);
        toast.error("Failed to load vault items");
      }
    };

    fetchVaultItems();
  }, []);


  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 ${
        darkTheme
          ? "bg-dark-background text-dark-primaryText"
          : "bg-light-background text-light-primaryText"
      }`}
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">🔓 Vault Access Granted</h1>
        <p
          className={`${
            darkTheme ? "text-dark-secondaryText" : "text-light-secondaryText"
          }`}
        >
          Welcome to your secured Vault!
        </p>

        <button
          onClick={() => setShowAddModal(true)}
          className={`px-4 py-2 rounded-xl font-semibold transition flex justify-center items-center gap-1 ${
            darkTheme
              ? "bg-dark-accent text-white hover:bg-dark-hover"
              : "bg-light-accent text-white hover:bg-light-hover"
          }`}
        >
          <IoMdAdd /> Add Password
        </button>

        {showAddModal && (
          <AddPasswordModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSuccess={(newItem) => {
              setVaultItems((prev) => [...prev, newItem]);
              toast.success("Password added successfully!");
            }}
          />
        )}

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setItemToDelete(null);
          }}
        />

        {/* mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full max-w-6xl mx-auto">
          {vaultItems.map((item, index) => (
            <div
              key={index}
              className={`px-10 py-3 rounded-xl shadow-md flex justify-between items-center ${
                darkTheme
                  ? "bg-dark-secondary text-dark-primaryText"
                  : "bg-light-secondary text-light-primaryText"
              }`}
            >
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="font-mono text-sm">
                  {visibleIndex === index ? item.password : "••••••••••••"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleVisibility(index)}
                  className={`p-1 rounded-md ${
                    darkTheme ? "hover:bg-dark-hover" : "hover:bg-light-hover"
                  } transition`}
                >
                  {visibleIndex === index ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

                <button
                  onClick={() => handleCopy(item.password)}
                  className={`p-1 rounded-md ${
                    darkTheme ? "hover:bg-dark-hover" : "hover:bg-light-hover"
                  } transition`}
                >
                  <Copy size={18} />
                </button>

                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className={`p-1 rounded-md ${
                    darkTheme ? "hover:bg-dark-hover" : "hover:bg-light-hover"
                  } transition`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vault;
