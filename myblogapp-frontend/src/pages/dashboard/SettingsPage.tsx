import React, { useState, useEffect } from "react";
import { FaSave, FaTrashAlt, FaRegUserCircle } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";

type SettingsProps = {
  user: {
    name: string;
    email: string;
    bio: string;
    profilePicture: string;
  };
};

const SettingsPage = () => {
  const {user, setUser} = useUser();
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    profilePicture: user.profilePicture,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User data saved:", formData);
    setIsEditing(false);
  };

  // Handle profile picture removal
  const handleRemoveProfilePicture = () => {
    setFormData({
      ...formData,
      profilePicture: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Account Settings</h1>

        {/* Profile Picture Section */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={formData.profilePicture || "/assets/default-profile-pic.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <button
              onClick={handleRemoveProfilePicture}
              className="text-red-600 hover:underline flex items-center space-x-2"
            >
              <FaTrashAlt />
              <span>Remove Profile Picture</span>
            </button>
          </div>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="name">
              Display Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Bio Field */}
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="password">
              Change Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="New Password"
              disabled={!isEditing}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              disabled={!isEditing}
              className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              <FaSave className="mr-2" />
              Save Changes
            </button>

            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:underline flex items-center"
              >
                <FaRegUserCircle className="mr-2" />
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
