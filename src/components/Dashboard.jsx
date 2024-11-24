import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { disableUser, getUsers, updateUserRole, delUser } from '../service/api';
import PermissionModal from './PermissionModal';
import CreateUser from './CreateUser'
import UserInfo from './UserInfo'
import Footer from './Footer'
const DashboardUsers = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [darkMode, setDarkMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCrUserModalOpen, setIsCrUserModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [permissionsInput, setPermissionsInput] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const currentUser = {
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
    };
    const handleOpenModal = () => setIsCrUserModalOpen(true);
    const handleCloseModal = () => setIsCrUserModalOpen(false);

    // Fetch users on mount
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers();
            setUsers(response.data);
        };

        fetchUsers();
    }, [selectedUser]);

    const visibleUsers = useMemo(() => {
        const startIndex = page * pageSize;
        return users.slice(startIndex, startIndex + pageSize);
    }, [users, page, pageSize]);

    const handleEditRole = async (id, newRole) => {
        if (currentUser.role !== 'admin') return;
        const response = await updateUserRole({
            "userId": id,
            "role": newRole.toLowerCase()
        })
        console.log(response);
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === id ? { ...user, role: newRole } : user
            )
        );
    };

    // Optimistic UI update on toggle and API call to disable user
    const handleToggle = async (userId) => {
        // Optimistically update the UI by toggling the user's state
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === userId ? { ...user, isDisabled: !user.isDisabled } : user
            )
        );

        try {
            // Call the API to update the user state
            await disableUser({ userId });
        } catch (error) {
            console.error("Failed to toggle user state:", error);
            // If the API call fails, revert the change
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, isDisabled: !user.isDisabled } : user
                )
            );
        }
    };

    const handleDeleteUser = async (userId) => {
        try {

            const response = await delUser({ "userId": userId });

            console.log(response);
            setUsers((prev) => prev.filter((user) => user._id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Something went wrong while deleting the user.');
        }
    };

    return (
        <div className={`${darkMode ? 'dark' : ''} `}>
            <div className="bg-gray-50 dark:bg-[#0a0b10] text-[#010309] dark:text-[#f9fafb] min-h-screen p-8">
                {/* Header */}
                <div className="flex justify-between items-center pb-6 mt-6">
                    <h1 className="text-2xl font-semibold">User Dashboard</h1>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={handleOpenModal}
                            className="px-4 py-2 rounded text-[#f9fafb] bg-gradient-to-r from-[#a290ff] to-[#098dfb] px-4 py-2 rounded-lg shadow-lg  hover:opacity-90  transition duration-300"
                        >
                            Create User
                        </button>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="px-4 py-2 rounded text-[#f9fafb] bg-gradient-to-r from-[#a290ff] to-[#098dfb] px-4 py-2 rounded-lg shadow-lg  hover:opacity-90  transition duration-300"
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                </div>


                {/* User Table */}
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-[#1A1E28]">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-gray-200 dark:bg-[#1A1E28]">
                            <tr>
                                <th className="p-3 text-left border-b border-gray-200 dark:border-gray-700 text-[#010309] dark:text-[#f9fafb]">Avatar</th>
                                <th className="p-3 text-left border-b border-gray-200 dark:border-gray-700 text-[#010309] dark:text-[#f9fafb]">Name</th>
                                <th className="p-3 text-left border-b border-gray-200 dark:border-gray-700 text-[#010309] dark:text-[#f9fafb]">Email</th>
                                <th className="p-3 text-left border-b  border-gray-200 dark:border-gray-700 text-[#010309] dark:text-[#f9fafb]">Role</th>
                                <th className="p-3 text-left border-b border-gray-200 dark:border-gray-700 text-[#010309] dark:text-[#f9fafb]">Permissions</th>
                                <th className="p-3 text-left border-b border-gray-200 dark:border-gray-700 text-[#010309] dark:text-[#f9fafb]">Active</th>
                                <th className="p-3 text-left border-b border-gray-200 dark:border-gray-700 text-[#010309] dark:text-[#f9fafb]">Bio</th>
                                <th className="p-3 text-left border-b border-gray-200 dark:border-gray-700 text-[#010309] dark:text-[#f9fafb]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleUsers.map((user) => (

                                <tr key={user._id} className="hover:bg-gray-50 border-gray-200 dark:border-gray-700 dark:hover:bg-gray-600 ">

                                    <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                                        <img
                                            src={user.profileImage}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </td>
                                    <td className="p-3 border-b border-gray-200 dark:border-gray-700">{user.name}</td>
                                    <td className="p-3 border-b border-gray-200 dark:border-gray-700">{user.email}</td>
                                    <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                                        {currentUser.role === 'admin' ? (
                                            <select
                                                value={user.role}
                                                onChange={(e) =>
                                                    handleEditRole(user._id, e.target.value)
                                                }
                                                className="p-1 border rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                                            >
                                                <option value="basic">Basic</option>
                                                <option value="editor">Editor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        ) : (
                                            user.role
                                        )}
                                    </td>
                                    <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                                        {user.permissions.join(', ')}
                                        <button
                                            className="ml-2 px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            Add
                                        </button>
                                    </td>
                                    <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center">
                                            <span className="mr-2">{user.isDisabled ? "No" : "Yes"}</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={!user.isDisabled}
                                                    onChange={() => handleToggle(user._id)}
                                                />
                                                <div
                                                    className={`w-11 h-6 rounded-full transition-colors 
                                            ${user.isDisabled ? "bg-red-500" : "bg-gray-200"} 
                                            peer dark:bg-gray-700 peer-checked:bg-gray-200`}
                                                >
                                                    <div
                                                        className={`absolute top-0.5 left-[2px] h-5 w-5 bg-white border rounded-full transition-all 
                                                ${user.isDisabled ? "translate-x-5" : "translate-x-0"}`}
                                                    ></div>
                                                </div>
                                            </label>
                                        </div>
                                    </td>

                                    <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                                        {user.bio}
                                    </td>

                                    <td className="p-3 border-b space-x-2 border-gray-200 dark:border-gray-700">

                                        <button
                                            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setIsUserModalOpen(true);
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12h2m-2 0h-2m2 0V6m0 6v6M19 19H5V5h14v14z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                                            onClick={() => handleDeleteUser(user._id)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </td>

                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                        className="px-4 py-2 rounded bg-gradient-to-r from-[#a290ff] to-[#098dfb] text-[#f9fafb]"
                        disabled={page === 0}
                    >
                        Previous
                    </button>
                    <span>
                        Page {page + 1} of {Math.ceil(users.length / pageSize)}
                    </span>
                    <button
                        onClick={() =>
                            setPage((prev) =>
                                prev + 1 < Math.ceil(users.length / pageSize)
                                    ? prev + 1
                                    : prev
                            )
                        }
                        className="px-4 py-2 rounded bg-gradient-to-r from-[#a290ff] to-[#098dfb] disabled:bg-blue-300 text-[#f9fafb]"
                        disabled={page + 1 >= Math.ceil(users.length / pageSize)}
                    >
                        Next
                    </button>
                </div>

                {/* Permissions Modal */}
                {isModalOpen && (
                    <PermissionModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        user={selectedUser}
                        inputValue={permissionsInput}
                        setInputValue={setPermissionsInput}
                    />

                )}
                {isUserModalOpen && (
                    <UserInfo
                        isOpen={isUserModalOpen}
                        onClose={() => setIsUserModalOpen(false)}
                        user={selectedUser}
                    />

                )}

                <CreateUser
                    isOpen={isCrUserModalOpen} onClose={handleCloseModal} />



            </div>
            <Footer />
        </div>
    );
};

export default DashboardUsers;
