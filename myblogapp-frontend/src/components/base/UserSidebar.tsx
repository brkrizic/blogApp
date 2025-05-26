import { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutModal from "../modals/LogoutModal";

const UserSidebar = () => {

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsLogoutModalOpen(false);
  }

  const onLogout = () => {
    console.log("Logged out")
    setIsLogoutModalOpen(false);
  }

  const onOpen = () => {
    setIsLogoutModalOpen(true);
  }

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 shadow fixed top-0 left-0 bottom-0 z-30">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
      </div>

      <nav className="p-4 space-y-2">
        <NavLink
          to="/account/dashboard"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-50 ${
              isActive ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700"
            }`
          }
        >
          📊 Stats
        </NavLink>

        <NavLink
          to="/account/profile"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-50 ${
              isActive ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700"
            }`
          }
        >
          👤 Profile
        </NavLink>

        <NavLink
          to="/account/myposts"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-50 ${
              isActive ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700"
            }`
          }
        >
          📝 My Posts
        </NavLink>

        <NavLink
          to="/account/settings"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-50 ${
              isActive ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700"
            }`
          }
        >
          ⚙️ Settings
        </NavLink>

        <button
          onClick={onOpen}
          className="block px-4 py-2 rounded text-red-600 hover:bg-red-50"
        >
          🚪 Logout
        </button>
      </nav>
      <LogoutModal isOpen={isLogoutModalOpen} onClose={onClose} onLogout={onLogout}/>
    </aside>
  );
};

export default UserSidebar;
