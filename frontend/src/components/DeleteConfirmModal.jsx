import { X } from "lucide-react";
import { useSelector } from "react-redux";

const DeleteConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  const darkTheme = useSelector((state) => state.theme.darkTheme);

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
          onClick={onCancel}
          className={`absolute top-3 right-3 transition-colors ${
            darkTheme
              ? "text-dark-secondaryText hover:text-dark-accent"
              : "text-light-secondaryText hover:text-light-accent"
          }`}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-2">⚠️ Confirm Deletion</h2>
        <p
          className={`text-sm ${
            darkTheme ? "text-dark-secondaryText" : "text-light-secondaryText"
          }`}
        >
          Are you sure you want to delete this password? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              darkTheme
                ? "bg-dark-secondary text-white hover:bg-dark-hover"
                : "bg-light-secondary text-black hover:bg-light-hover"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
