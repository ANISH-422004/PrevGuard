import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useIsFirstTimeUser } from "./hooks/useIsFirstTimeUser";
import VaultSetupModal from "../../components/VaultSetupModal/VaultSetupModal";
import VaultUnlockModal from "../../components/VaultUnlockModal/VaultUnlockModal";
import { useNavigate } from "react-router-dom";

const Vault = () => {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const navigate = useNavigate();
  const { isFirstTimeUser, loading } = useIsFirstTimeUser();
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false); // Controls Vault access
  const [showUnlockModal, setShowUnlockModal] = useState(false); // Controls modal visibility
  


  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === "admin") {
      setUnlocked(true);
      toast.success("🔓 Vault unlocked!");
    } else {
      toast.error("❌ Incorrect password!");
    }
  };

  useEffect(() => {
    if (!loading && !isFirstTimeUser && !unlocked) {
      setShowUnlockModal(true);
    }
  }, [loading, isFirstTimeUser, unlocked]);

  if (loading) return <LoadingScreen />;

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
        <div className="grid gap-4 mt-6">
          {[
            { app: "Google", password: "mySecret123" },
            { app: "Facebook", password: "passw0rd!" },
            { app: "Twitter", password: "qwerty12345" },
          ].map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl shadow-md flex justify-between items-center ${
                darkTheme
                  ? "bg-dark-secondary text-dark-primaryText"
                  : "bg-light-secondary text-light-primaryText"
              }`}
            >
              <div>
                <h3 className="font-semibold">{item.app}</h3>
                <p className="font-mono text-sm">••••••••••••</p>
              </div>
              <button
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  darkTheme
                    ? "bg-dark-accent text-white hover:bg-dark-hover"
                    : "bg-light-accent text-white hover:bg-light-hover"
                } transition`}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Vault Setup Modal for first-time users */}
      {isFirstTimeUser ? <VaultSetupModal isOpen={true} /> : null}

      {/* Unlock Vault Form */}
      <VaultUnlockModal
        isOpen={showUnlockModal}
        onSuccess={() => {
          setUnlocked(true);
          setShowUnlockModal(false);
          toast.success("🔓 Vault unlocked!");
        }}
        onCancel={() => {
          toast.info("Vault unlock cancelled. Redirecting...");
          navigate("/dashboard");
          setShowUnlockModal(false);
        }}
      />
    </div>
  );
};

export default Vault;
