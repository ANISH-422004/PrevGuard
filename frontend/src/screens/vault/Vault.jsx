import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import useVaultSalt from "./hooks/useVaultSalt";

const Vault = () => {
  const { salt, loading } = useVaultSalt(); // <-- use the hook
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const darkTheme = useSelector((state) => state.theme.darkTheme);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === "admin") {
      setUnlocked(true);
      toast.success("🔓 Vault unlocked!");
    } else {
      toast.error("❌ Incorrect password!");
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 ${
        darkTheme
          ? "bg-dark-background text-dark-primaryText"
          : "bg-light-background text-light-primaryText"
      }`}
    >
      {!unlocked ? (
        <form
          onSubmit={handleUnlock}
          className={`w-full max-w-sm p-6 rounded-2xl shadow-lg space-y-4 ${
            darkTheme
              ? "bg-dark-secondary border border-dark-hover"
              : "bg-light-secondary border border-light-hover"
          }`}
        >
          <h2 className="text-2xl font-bold text-center">
            🔐 Enter Vault Password
          </h2>
          <input
            type="password"
            placeholder="Vault Password"
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-dark-accent ${
              darkTheme
                ? "bg-dark-background border-dark-hover placeholder-dark-secondaryText text-dark-primaryText"
                : "bg-light-background border-light-hover placeholder-light-secondaryText text-light-primaryText"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-dark-action text-white py-2 rounded-xl hover:bg-dark-hover transition-all"
          >
            Unlock
          </button>
        </form>
      ) : (
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
      )}
    </div>
  );
};

export default Vault;
