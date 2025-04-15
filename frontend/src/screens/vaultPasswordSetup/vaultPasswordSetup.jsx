import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosInstance from '../../config/axios/axios';
import { useNavigate } from 'react-router-dom';

const VaultPasswordSetup = () => {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const [password, setPassword] = useState('');
  const [created, setCreated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post('http://localhost:3000/api/vault/createvaultPassword', { password });
      setCreated(true);
      toast.success('Vault password created successfully 🎉');
      navigate("/vault")
    } catch (err) {
      console.error(err);
      toast.error('Failed to create vault password. Try again.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${darkTheme ? 'bg-dark-background text-dark-primaryText' : 'bg-light-background text-light-primaryText'}`}>
      <div className={`max-w-md w-full p-6 rounded-xl shadow-md ${darkTheme ? 'bg-dark-secondary' : 'bg-light-secondary'}`}>
        <h2 className="text-2xl font-bold mb-4">Vault Password Setup</h2>
        <p className={`text-sm mb-4 ${darkTheme ? 'text-dark-secondaryText' : 'text-light-secondaryText'}`}>
          You can only create your vault password once. Please remember it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Create Vault Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={created}
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
            disabled={created}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              created
                ? 'cursor-not-allowed opacity-50'
                : `${darkTheme ? 'bg-dark-action hover:bg-dark-hover' : 'bg-light-action hover:bg-light-hover'}`
            }`}
          >
            Create Vault Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default VaultPasswordSetup;
