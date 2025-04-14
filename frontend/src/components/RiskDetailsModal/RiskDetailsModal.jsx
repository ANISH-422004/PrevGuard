import React from 'react';
import { X } from 'lucide-react';

const RiskDetailsModal = ({ isOpen, onClose, riskItem, darkTheme }) => {
  if (!isOpen || !riskItem) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div
        className={`relative rounded-lg shadow-lg max-w-md w-full p-6 transition-colors duration-300 ${
          darkTheme ? 'bg-dark-secondary text-dark-primaryText' : 'bg-light-secondary text-light-primaryText'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 p-1 rounded-full hover:bg-gray-300 ${
            darkTheme ? 'text-dark-secondaryText' : 'text-light-secondaryText'
          }`}
        >
          <X size={20} />
        </button>
        <h2
          className={`text-xl font-semibold mb-4 ${
            darkTheme ? 'text-dark-accent' : 'text-light-accent'
          }`}
        >
          {riskItem.appName} - Risk Details
        </h2>
        <p className="mb-2">
          Risk Score: <span className="font-semibold">{riskItem.riskScore}</span>
        </p>
        {riskItem.matchedBreach && (
          <p className="text-sm text-gray-500 mb-2">
            Breached on: {new Date(riskItem.matchedBreach.breachedDate).toLocaleDateString()}
          </p>
        )}
        {riskItem.matchedFields.length > 0 && (
          <div className="mb-3">
            <h3 className="font-semibold text-sm">Exposed Data:</h3>
            <ul className="list-disc list-inside text-sm">
              {riskItem.matchedFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </div>
        )}
        {riskItem.tips.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm">Recommended Actions:</h3>
            <ul className="list-disc list-inside text-sm">
              {riskItem.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
        {!riskItem.matchedBreach && (
          <p className="text-sm text-gray-500 mt-2">No recent breaches found matching this app.</p>
        )}
      </div>
    </div>
  );
};

export default RiskDetailsModal;