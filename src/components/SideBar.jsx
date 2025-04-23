// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ activeTab, onTabChange, onLogout }) => {
  return (
    <aside className="w-1/5">
      <nav className="flex flex-col space-y-2 text-sm">
        <button
          onClick={() => onTabChange("myaccount")}
          className={`text-left px-4 py-2 rounded-full ${
            activeTab === "myaccount"
              ? "bg-black text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          My Account
        </button>
        <button
          onClick={() => onTabChange("edit-profile")}
          className={`text-left px-4 py-2 rounded-full ${
            activeTab === "edit-profile"
              ? "bg-black text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => onTabChange("ads")}
          className={`text-left px-4 py-2 rounded-full ${
            activeTab === "ads"
              ? "bg-black text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Ads
        </button>
        <button
          onClick={() => onTabChange("create")}
          className={`text-left px-4 py-2 rounded-full ${
            activeTab === "create"
              ? "bg-rose-500 text-white"
              : "text-rose-500 hover:bg-rose-100 font-bold"
          }`}
        >
          Post Ad
        </button>
        <button
          onClick={onLogout}
          className="text-left text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
