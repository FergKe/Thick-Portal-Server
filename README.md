# Thicket-Portal Backend API

## Project Description
This project serves as the backend API for the Thicket Portal, a system designed to manage job sheets, planting tasks, non-planting tasks, jobs, and user profiles. It provides a robust and scalable foundation for data management and interaction, built with Node.js, Express, and TypeScript.

## Features
- **Job Management:** Create, read, update, and delete job records.
- **Job Sheet Management:** Comprehensive CRUD operations for job sheets, including detailed planting and non-planting task information.
- **Plant Management:** Manage plant species data.
- **Non-Planting Task Management:** Handle various non-planting tasks associated with jobs.
- **User Profile Management:** Securely manage user profiles and authentication.
- **Error Handling:** Centralized error handling to provide consistent and informative responses.

## Technologies Used
- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **TypeScript:** Typed superset of JavaScript that compiles to plain JavaScript.
- **Mongoose:** MongoDB object data modeling (ODM) for Node.js.
- **MongoDB:** NoSQL database for storing application data.
- **JSON Web Tokens (JWT):** For secure authentication and authorization.

## Folder Structure
The project follows a modular structure to ensure maintainability and scalability:

```
.
├───dist/                 # Compiled JavaScript output
├───node_modules/         # Node.js dependencies
├───src/
│   ├───server.ts         # Main application entry point
│   ├───config/           # Configuration files (e.g., database connection)
│   ├───controllers/      # Request handlers for API endpoints
│   ├───errors/           # Custom error classes
│   ├───middleware/       # Express middleware
│   ├───models/           # Mongoose schemas and models
│   ├───routes/           # API route definitions
│   ├───services/         # Business logic and database interactions
│   ├───types/            # TypeScript type definitions
│   └───utils/            # Utility functions (e.g., JWT helper)
├───.env                  # Environment variables
├───package.json          # Project metadata and dependencies
├───package-lock.json     # Dependency lock file
├───tsconfig.json         # TypeScript configuration
└───README.md             # Project README
```

