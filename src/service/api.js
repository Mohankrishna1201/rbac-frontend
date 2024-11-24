import axios from 'axios';

const API = axios.create({ baseURL: 'https://rbac-backend-b0xp.onrender.com/api' }); // Keep the general base URL

// Attach token to each request if available
API.interceptors.request.use((req) => {
    return req;
});

// 📌 Role Management
export const getRoles = () => API.get('/admin/roles');

// 📌 User Role Management
export const updateUserRole = (data) => API.post('/admin/user/role', data);
export const removeUserRole = (data) => API.delete('/admin/user/role', { data });

// 📌 User Permissions Management
export const getUserPermissions = (userId) => API.get(`/admin/user/${userId}/permissions`);
export const addPermissionToUser = (data) => API.post('/admin/user/permissions', data);
export const updateUserPermissions = (data) => API.put('/admin/user/permissions', data);
export const removePermissionFromUser = (data) => API.delete('/admin/user/permissions', { data });
export const createUser = (data) => API.post('/admin/add-user', data);
export const delUser = (data) => API.post('/admin/deleteUser', data);

// 📌 User Details Management
export const getUserDetails = (userId) => API.get(`/admin/user/${userId}`);
export const disableUser = (data) => API.post('/admin/user/disable', data);

// 📌 User Profile Management
export const getProfile = () => API.get('/user/profile');

// get all users
export const getUsers = () => API.get('/admin/users')
