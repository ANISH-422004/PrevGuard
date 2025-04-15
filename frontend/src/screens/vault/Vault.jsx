import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../config/axios/axios";
import { resetVault, setVaultUnlocked } from "../../app/slices/vaultSlice"; 
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import AddPasswordModal from "../../components/AddPasswordModal";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import UpdatePasswordModal from "../../components/UpdatePasswordModal";
import { Copy, Eye, EyeIcon, EyeOff, EyeOffIcon, Trash2 } from "lucide-react";

const Vault = () => {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vaultItems, setVaultItems] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const vaultUnlocked = useSelector((state) => state.vault.unlocked);

  useEffect(() => {
    const checkVaultStatus = async () => {
      try {
        const res = await axiosInstance.get(
          "http://localhost:3000/api/vault/isInitialized"
        );
        const user = res.data;
        dispatch(setVaultUnlocked(user.isInitialized));

        if (!user.isInitialized) {
          navigate("/setupVaultPassword");  // Redirect to setup password page if vault is not initialized
        } else if (!vaultUnlocked) {
          navigate("/vaultPassword");  // Navigate to the password entry page if vault is unlocked
        }
      } catch (err) {
        console.log("Error checking vault status:", err);
        toast.error("Could not check vault status. Try again.");
      }
    };

    checkVaultStatus();

    // Reset vault state when the component unmounts
    return () => {
      dispatch(resetVault());
    };
  }, [dispatch, navigate, vaultUnlocked]);

  useEffect(() => {
    if (vaultUnlocked) {
      const fetchVaultItems = async () => {
        try {
          const res = await axiosInstance.get("/api/vault/getall");
          setVaultItems(res.data); 
        } catch (err) {
          console.error(err);
          toast.error("Failed to load vault items");
        }
      };

      fetchVaultItems();
    }
  }, [vaultUnlocked]);

  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId);
    setShowDeleteModal(true);
  };

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

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 ${darkTheme ? "bg-dark-background text-dark-primaryText" : "bg-light-background text-light-primaryText"}`}
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">🔓 Vault Access Granted</h1>
        <p className={`${darkTheme ? "text-dark-secondaryText" : "text-light-secondaryText"}`}>
          Welcome to your secured Vault!
        </p>

        <button
          onClick={() => setShowAddModal(true)}
          className={`px-4 py-2 rounded-xl font-semibold transition flex justify-center items-center gap-1 ${darkTheme ? "bg-dark-accent text-white hover:bg-dark-hover" : "bg-light-accent text-white hover:bg-light-hover"}`}
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

        <UpdatePasswordModal
          isOpen={showEditModal}
          vaultItem={selectedItem}
          onClose={() => {
            setShowEditModal(false);
            setSelectedItem(null);
          }}
          onSuccess={async () => {
            const res = await axiosInstance.get("/api/vault/getall");
            setVaultItems(res.data);
          }}
        />

        {/* mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full max-w-6xl mx-auto">
          {vaultItems.map((item, index) => (
            <div
              key={index}
              className={`px-10 py-3 rounded-xl shadow-md flex justify-between items-center ${darkTheme ? "bg-dark-secondary text-dark-primaryText" : "bg-light-secondary text-light-primaryText"}`}
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
                  className={`p-1 rounded-md ${darkTheme ? "hover:bg-dark-hover" : "hover:bg-light-hover"} transition`}
                >
                  {visibleIndex === index ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>

                <button
                  onClick={() => handleCopy(item.password)}
                  className={`p-1 rounded-md ${darkTheme ? "hover:bg-dark-hover" : "hover:bg-light-hover"} transition`}
                >
                  <Copy size={18} />
                </button>

                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className={`p-1 rounded-md ${darkTheme ? "hover:bg-dark-hover" : "hover:bg-light-hover"} transition`}
                >
                  <Trash2 size={18} />
                </button>

                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setShowEditModal(true);
                  }}
                  className={`p-1 rounded-md ${darkTheme ? "hover:bg-dark-hover" : "hover:bg-light-hover"} transition text-blue-500`}
                >
                  Edit
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
