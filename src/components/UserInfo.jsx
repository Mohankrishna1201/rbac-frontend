import React from 'react';
import { IoClose } from 'react-icons/io5'; // Import the close icon

const UserInfoModal = ({ user, isOpen, onClose }) => {
    if (!isOpen || !user) return null;
    const joinedPermissions = user.permissions.join(", ");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-75  text-[#010309] dark:text-[#f9fafb]">
            <div className="relative m-10 w-full max-w-sm rounded-lg border bg-white dark:bg-[#0a0b10] px-6 py-8 shadow-lg  dark:border-gray-700">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#010309] dark:text-[#f9fafb] transition-transform hover:text-red-500 hover:scale-110  dark:hover:text-red-400"
                    aria-label="Close modal"
                >
                    <IoClose className="h-6 w-6" /> {/* Close icon */}
                </button>

                {/* User Image */}
                <div className="relative mx-auto mb-4 h-36 w-36 overflow-hidden rounded-full border-4 border-gray-200 shadow-sm dark:border-gray-600">
                    <span className="absolute right-1 bottom-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800"></span>
                    <img
                        className="h-full w-full object-cover"
                        src={user.profileImage || 'https://via.placeholder.com/150'}
                        alt={user.name}
                    />
                </div>

                {/* User Name */}
                <h1 className="text-center text-xl font-bold text-[#010309] dark:text-[#f9fafb]">{user.name}</h1>

                {/* User Role */}
                <h3 className="mt-1 -center text-lg text-[#010309] dark:text-[#f9fafb] text-center">
                    {user.role || 'No role specified'}
                </h3>

                {/* User Bio */}
                <p className="mt-2 text-center text-sm text-[#010309] dark:text-[#f9fafb]">
                    {user.bio || 'No bio available.'}
                </p>

                {/* Additional Info */}
                <ul className="mt-6 divide-y rounded bg-gray-100 py-2 px-3 text-[#010309] dark:text-[#f9fafb] shadow-sm dark:bg-[#1A1E28] dark:divide-gray-600 ">
                    <li className="flex items-center justify-between py-3 text-sm">
                        <span>Email</span>
                        <span className="rounded-full bg-green-100 py-1 px-3 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-200">
                            {user.email}
                        </span>
                    </li>
                    <li className="flex items-center justify-between py-3 text-sm">
                        <span>Permissions</span>
                        <span className="truncate">{joinedPermissions || 'No permissions assigned'}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserInfoModal;
