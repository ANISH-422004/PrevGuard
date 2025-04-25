import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVaultUnlocked } from '../../app/slices/vaultSlice'; // Import your action
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axios/axios';

const UnlockVault = () => {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const dispatch = useDispatch();  // Initialize dispatch
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUnlock = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post('/api/vault/openvault', { password });
      toast.success(res.data.message || 'Vault unlocked!');

      // Dispatch the action to update the vault status in Redux
      dispatch(setVaultUnlocked(true));

      navigate('/vault');  // Navigate to the vault after unlocking
    } catch (err) {
      toast.error(err.response?.data?.message || 'Incorrect password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${darkTheme ? 'bg-dark-background text-dark-primaryText' : 'bg-light-background text-light-primaryText'}`}>
      <div className={`max-w-md w-full p-6 rounded-xl shadow-md ${darkTheme ? 'bg-dark-secondary' : 'bg-light-secondary'}`}>
        <h2 className="text-2xl font-bold mb-4">Unlock Vault</h2>
        <p className={`text-sm mb-4 ${darkTheme ? 'text-dark-secondaryText' : 'text-light-secondaryText'}`}>
          Enter your vault password to unlock your stored data.
        </p>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Vault Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none ${
                darkTheme
                  ? 'bg-dark-background border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-black'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              loading
                ? 'opacity-50 cursor-not-allowed'
                : `${darkTheme ? 'bg-dark-action hover:bg-dark-hover' : 'bg-light-action hover:bg-light-hover'}`
            }`}
          >
            {loading ? 'Unlocking...' : 'Unlock Vault'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UnlockVault;
