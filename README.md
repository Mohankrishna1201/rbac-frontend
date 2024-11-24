# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# MERN RBAC Backend

This repository contains the backend code for a Role-Based Access Control (RBAC) system built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. The system allows admins to manage users, roles, and permissions while providing restricted access for regular users.

## Features

- **User Management**: Admins can create, update, and delete users.
- **Role Management**: Define and assign roles to users.
- **Permission Control**: Specify and manage permissions for different roles.
- **Cookie-Based Authentication**: Secure user authentication with cookies.
- **MongoDB Integration**: Stores user data, roles, permissions, and profile images.
- **JWT Authentication**: Ensures secure login and access control.

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <project-directory>
   npm install
   ```
Set up environment variables: Create a .env file in the root directory and add the following variables:

env
Copy code
 ```bash
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```
Start the server:
 ```bash
npm start
```
