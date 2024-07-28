import React, { useState, useEffect } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import "./UserProfile.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const UserProfile = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("/image.svg");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [urls, setUrls] = useState([""]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/details`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userData = response.data.data;
        setUsername(userData.username);
        setEmail(userData.email);
        setBio(userData.bio);
        setUrls(userData.urls || [""]);
        setProfileImageUrl(userData.profileImageUrl || "/image.svg");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [BASE_URL, accessToken]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handlePasswordEdit = () => {
    setIsEditingPassword(true);
  };

  const handlePasswordSave = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.put(
        `${BASE_URL}/users/update-password`,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsEditingPassword(false);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handlePasswordCancel = () => {
    setIsEditingPassword(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    setProfileImageUrl(URL.createObjectURL(file));
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("bio", bio);
      urls.forEach((url, index) => formData.append(`url_${index}`, url));
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      await axios.put(`${BASE_URL}/users/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="w-3/4 max-w-xl mx-auto p-5 relative">
        <h2 className="text-2xl font-bold mb-5">User Profile</h2>
        <div className="text-center mb-8 ">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-2"
          />
          <label
            htmlFor="profileImage"
            className="text-blue-500 cursor-pointer"
          >
            Change profile photo
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <form
          onSubmit={handleProfileUpdate}
          className={`space-y-4 ${isEditingPassword ? "blur-background" : ""}`}
        >
          <label className="block">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </label>
          <label className="block">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </label>
          <label className="block">
            Password
            <div className="flex items-center mt-1">
              <input
                type={passwordVisible ? "text" : "password"}
                value="current_password"
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="ml-2 text-black"
              >
                {passwordVisible ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
              <button
                type="button"
                onClick={handlePasswordEdit}
                className="ml-2 text-blue-500"
              >
                Edit
              </button>
            </div>
          </label>
          <label className="block">
            URLs
            {urls.map((url, index) => (
              <input
                key={index}
                type="text"
                value={url}
                onChange={(e) => {
                  const newUrls = [...urls];
                  newUrls[index] = e.target.value;
                  setUrls(newUrls);
                }}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            ))}
          </label>
          <label className="block">
            Bio
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded resize-vertical"
            />
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Update changes
          </button>
        </form>
        <div className="absolute top-5 right-5">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
        {isEditingPassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Edit Password</h3>
              <label className="block mb-3 relative">
                New Password
                <input
                  type={newPasswordVisible ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500"
                >
                  {newPasswordVisible ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </label>
              <label className="block mb-3 relative">
                Confirm New Password
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {confirmPasswordVisible ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </label>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handlePasswordCancel}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordSave}
                  className="px-4 py-2 bg-blue-500

                                 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer/>
    </div>
  );
};

export default UserProfile;
