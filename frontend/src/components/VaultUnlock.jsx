// src/components/VaultUnlock.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import * as argon2 from "argon2-browser";

const VaultUnlock = ({ salt, onUnlock }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnlock = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error("Vault password is required.");
      return;
    }

    try {
      setLoading(true);

      // Derive key using argon2id
      const { hash } = await argon2.hash({
        pass: password,
        salt,
        type: argon2.ArgonType.Argon2id,
        hashLen: 32,
        time: 3,
        mem: 65536,
        parallelism: 1,
      });

      onUnlock(hash, password); // Send key & password to parent
    } catch (err) {
      toast.error("Key derivation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUnlock}
      className="bg-card p-6 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-xl font-semibold text-foreground">Enter Vault Password</h2>
      <p className="text-sm text-muted-foreground">
        This password is used to encrypt/decrypt your Vault data. Don’t forget it.
      </p>
      <input
        type="password"
        placeholder="Vault Password"
        className="w-full p-2 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-xl w-full font-semibold hover:bg-primary/90 transition"
      >
        {loading ? "Unlocking..." : "Unlock Vault"}
      </button>
    </form>
  );
};

export default VaultUnlock;
