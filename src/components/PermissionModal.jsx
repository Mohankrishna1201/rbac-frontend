import React, { useEffect, useState } from 'react';
import { updateUserPermissions, getUserPermissions, addPermissionToUser, removePermissionFromUser } from '../service/api.js';
import { FaPencilAlt, FaTrash } from 'react-icons/fa'; // For pencil and trash icons

const PermissionModal = ({
    isOpen,
    onClose,
    inputValue,
    setInputValue,
    user
}) => {
    const [permissions, setPermissions] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    const fetchPermissions = async () => {
        try {
            const response = await getUserPermissions(user._id);
            setPermissions(response.data.permissions || []);
        } catch (error) {
            console.error("Error fetching permissions:", error);
            setPermissions([]);
        }
    };

    const handleAdd = async () => {
        try {
            await addPermissionToUser({
                userId: user._id,
                permissions: inputValue
            });
            setInputValue('');
            fetchPermissions();
        } catch (error) {
            console.error("Error adding permission:", error);
        }
    };

    const handleSaveEdit = async () => {
        try {
            const updatedPermissions = [...permissions];
            updatedPermissions[isEditing] = editingValue;

            await updateUserPermissions({
                userId: user._id,
                permissions: updatedPermissions
            });

            setPermissions(updatedPermissions);
            setIsEditing(null);
            setEditingValue('');
        } catch (error) {
            console.error("Error updating permission:", error);
        }
    };

    const handleDelete = async (permission) => {
        try {
            await removePermissionFromUser({
                userId: user._id,
                permissions: permission
            });
            fetchPermissions();
        } catch (error) {
            console.error("Error deleting permission:", error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchPermissions();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-[#1A1E28] p-6 rounded-lg shadow-lg w-[450px]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#010309] dark:text-[#f9fafb] ">
                        Permissions
                    </h3>
                </div>

                <input
                    type="text"
                    placeholder="Enter permission"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 bg-white dark:bg-[#1A1E28] text-[#010309] dark:text-[#f9fafb]"
                />
                <button
                    onClick={handleAdd}
                    className="w-full px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Permission
                </button>

                <ul className="space-y-2">
                    {permissions.map((permission, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center p-2 border border-gray-300 rounded bg-white dark:bg-[#1A1E28] text-[#010309] dark:text-[#f9fafb]"
                        >
                            {isEditing === index ? (
                                <input
                                    type="text"
                                    value={editingValue}
                                    onChange={(e) => setEditingValue(e.target.value)}
                                    className="flex-grow mr-2 p-1 bg-gray-200 dark:bg-gray-600"
                                />
                            ) : (
                                <span>{permission}</span>
                            )}
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        if (isEditing === index) {
                                            handleSaveEdit();
                                        } else {
                                            setIsEditing(index);
                                            setEditingValue(permission);
                                        }
                                    }}
                                    className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                                >
                                    <FaPencilAlt />
                                </button>
                                <button
                                    onClick={() => handleDelete(permission)}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PermissionModal;
