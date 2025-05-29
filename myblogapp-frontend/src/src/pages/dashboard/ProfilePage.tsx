  import React, { useState } from "react";
  import { FaUserEdit } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";

  type ProfilePageProps = {
    userProfile: {
      name: string;
      email: string;
      bio: string;
      profilePicture: string;
      posts: number[];
    };
  };

  const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { user, setUser } = useUser();

    const handleEditClick = () => {
      setIsEditing((prev) => !prev);
    };

    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-4xl bg-white p-8 mt-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Profile</h1>
            <button
              onClick={handleEditClick}
              className="text-blue-600 hover:underline flex items-center space-x-2"
            >
              <FaUserEdit className="text-lg" />
              <span>Edit</span>
            </button>
          </div>

          <div className="flex flex-col items-center md:flex-row md:space-x-8">
            {/* Profile Picture */}
            <div className="mb-6 md:mb-0">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div>
                <label className="font-medium text-gray-700">Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.name}
                    className="mt-1 p-2 rounded border border-gray-300"
                  />
                ) : (
                  <p className="text-gray-700">{user.name}</p>
                )}
              </div>

              <div>
                <label className="font-medium text-gray-700">Email:</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={user.email}
                    className="mt-1 p-2 rounded border border-gray-300"
                  />
                ) : (
                  <p className="text-gray-700">{user.email}</p>
                )}
              </div>

              <div>
                <label className="font-medium text-gray-700">Bio:</label>
                {isEditing ? (
                  <textarea
                    value={user.bio}
                    className="mt-1 p-2 rounded border border-gray-300"
                  />
                ) : (
                  <p className="text-gray-700">{user.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default ProfilePage;
