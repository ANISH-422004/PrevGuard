import React, { useState } from 'react';
import axios from 'axios';
import sha1 from 'crypto-js/sha1';
import { useSelector } from 'react-redux';

const PasswordBreachCheck = () => {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const [password, setPassword] = useState('');
  const [breachCount, setBreachCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkPassword = async () => {
    if (!password) return;

    setLoading(true);
    setBreachCount(null);

    try {
      const hashed = sha1(password).toString().toUpperCase();
      const prefix = hashed.slice(0, 5);
      const suffix = hashed.slice(5);

      const res = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
     

      const lines = res.data.split('\n');
      const match = lines.find(line => line.startsWith(suffix));

      if (match) {
        const count = parseInt(match.split(':')[1]);
        setBreachCount(count);
      } else {
        setBreachCount(0);
      }
    } catch (err) {
      console.error('Error checking password breach:', err);
      setBreachCount(-1);
    }

    setLoading(false);
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center px-4 transition-colors duration-300 
      ${darkTheme ? 'bg-dark-background text-dark-primaryText' : 'bg-light-background text-light-primaryText'}
    `}>
      <div className={`w-full max-w-xl p-8 rounded-2xl shadow-2xl transition-all duration-300 
        ${darkTheme ? 'bg-dark-secondary' : 'bg-light-secondary'}
      `}>
        <h1 className="text-3xl font-bold mb-6 text-center">🔐 Password Breach Checker</h1>

        <input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-3 rounded-xl border-2 outline-none mb-4 transition 
            ${darkTheme 
              ? 'bg-dark-background text-dark-primaryText border-dark-hover placeholder-dark-secondaryText' 
              : 'bg-light-background text-light-primaryText border-light-hover placeholder-light-secondaryText'}
          `}
        />

        <button
          onClick={checkPassword}
          disabled={loading || !password}
          className={`w-full py-3 rounded-xl font-semibold transition-colors text-lg
            ${darkTheme 
              ? 'bg-dark-action text-dark-background hover:bg-dark-hover' 
              : 'bg-light-action text-white hover:bg-light-hover'}
          `}
        >
          {loading ? 'Checking...' : 'Check Breach'}
        </button>

        {breachCount !== null && (
          <div className={`mt-6 text-xl font-medium text-center
            ${breachCount === -1 
              ? 'text-yellow-500' 
              : breachCount > 0 
                ? 'text-red-500' 
                : 'text-green-600'}
          `}>
            {breachCount === -1
              ? '❌ Error checking breach.'
              : breachCount > 0
                ? `⚠️ This password was found in ${breachCount} breaches.   Try a different one! for better security.`
                : '✅ This password was not found in any known breach.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordBreachCheck;
