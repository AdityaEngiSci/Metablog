import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import './UserProfile.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer"; // Import the CSS file

const UserProfile = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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

    const handlePasswordSave = () => {
        // Implement password save logic here
        setIsEditingPassword(false);
    };

    const handlePasswordCancel = () => {
        setIsEditingPassword(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
        <main className="max-w-xl mx-auto p-5 relative">
            <h2 className="text-2xl font-bold mb-5">User Profile</h2>
            <div className="text-center mb-8">
                <img src="/image.svg" alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-2" />
                <button className="text-blue-500">Change profile photo</button>
            </div>
            <form className={`space-y-4 ${isEditingPassword ? 'blur-background' : ''}`}>
                <label className="block">
                    Username
                    <input type="text" value="@username123" readOnly
                           className="w-full p-2 mt-1 border border-gray-300 rounded"/>
                </label>
                <label className="block">
                    Email
                    <input type="email" value="email@domain.com" readOnly
                           className="w-full p-2 mt-1 border border-gray-300 rounded"/>
                </label>
                <label className="block">
                    Password
                    <div className="flex items-center mt-1">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            value="current_password"
                            readOnly
                            className="flex-1 p-2 border border-gray-300 rounded"
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="ml-2 text-black">
                            {passwordVisible ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                        </button>
                        <button type="button" onClick={handlePasswordEdit} className="ml-2 text-blue-500">
                            Edit
                        </button>
                    </div>
                </label>
                <label className="block">
                    URLs
                    <input type="text" value="linkedin.com" className="w-full p-2 mt-1 border border-gray-300 rounded"/>
                    <input type="text" value="website.com" className="w-full p-2 mt-1 border border-gray-300 rounded"/>
                    <input type="text" value="website.town" className="w-full p-2 mt-1 border border-gray-300 rounded"/>
                </label>
                <label className="block">
                    Bio
                    <textarea value="I am a designer based in Philadelphia, making great software at Figma."
                              className="w-full p-2 mt-1 border border-gray-300 rounded resize-vertical"></textarea>
                </label>
                <button type="submit" className="px-4 py-2 bg-black text-white rounded">Update changes</button>
            </form>

            {isEditingPassword && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Edit Password</h3>
                        <label className="block mb-3 relative">
                            New Password
                            <input
                                type={newPasswordVisible ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" // Tailwind classes added
                            />
                            <button type="button" onClick={toggleNewPasswordVisibility}
                                    className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500">
                                {newPasswordVisible ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                            </button>
                        </label>
                        <label className="block mb-3 relative">
                            Confirm New Password
                            <input
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <button type="button" onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {confirmPasswordVisible ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                            </button>
                        </label>
                        <div className="flex justify-end mt-4">
                            <button onClick={handlePasswordSave}
                                    className="px-4 py-2 bg-black text-white rounded-md mr-2">Save
                            </button>
                            <button onClick={handlePasswordCancel}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Cancel
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
