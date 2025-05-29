import React from "react";

type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const LogoutModal = ({ isOpen, onClose, onLogout }: LogoutModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to log out?</h2>

        <div className="flex justify-between">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          {/* Confirm Logout Button */}
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
