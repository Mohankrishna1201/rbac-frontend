import React, { useState } from 'react';
import { createUser } from '../service/api';
const CreateUser = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        bio: '',
        profileImage: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the API with formData
            const response = await createUser(formData);

            // Axios automatically parses JSON, so no need for `response.json()`
            console.log('User added successfully:', response.data);

            // Clear the form
            setFormData({
                name: '',
                email: '',
                password: '',
                role: '',
                bio: '',
                profileImage: ''
            });

            // Close the modal
            onClose();
        } catch (error) {
            // Axios errors are available in `error.response`
            console.error('Error adding user:', error.response?.data || error.message);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="p-6 w-[500px] mx-auto bg-white dark:bg-[#0a0b10] rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-[#010309] dark:text-[#f9fafb]">Add User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-[#010309] dark:text-[#f9fafb]font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white dark:bg-[#0a0b10] text-[#010309] dark:text-[#f9fafb] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#010309] dark:text-[#f9fafb] font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white dark:bg-[#0a0b10] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#010309] dark:text-[#f9fafb] font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white dark:bg-[#0a0b10] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-[#010309] dark:text-[#f9fafb] font-medium mb-2">
                            Role
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white dark:bg-[#0a0b10] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select role</option>
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="basic">Basic</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#010309] dark:text-[#f9fafb] font-medium mb-2">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white dark:bg-[#0a0b10] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter bio"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#010309] dark:text-[#f9fafb] font-medium mb-2">
                            Profile Image URL
                        </label>
                        <input
                            type="url"
                            name="profileImage"
                            value={formData.profileImage}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white dark:bg-[#0a0b10] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter image URL"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
