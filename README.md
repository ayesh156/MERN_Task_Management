# Task Management System

# Project Overview

This is a full-stack web application built using **React** for the frontend and **Node.js** for the backend. The application allows users to manage tasks with features to create, update, delete, and view tasks. Tasks can be categorized into **important**, **completed**, and **incompleted** tasks.

The project also includes **signup** and **login** pages, allowing users to register and securely authenticate using **JSON Web Tokens (JWT)**. All backend pages are secured, requiring authentication to access the task management features.

The application uses **MongoDB** as a non-relational database, storing data in two collections: **tasks** and **users**.

## Technology Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB (NoSQL)

## Web Application Github Link
https://github.com/ayesh156/MERN_Task_Management

## Web Application Review Video URL
https://drive.google.com/file/d/13cm6Pk2d-UYc0SM272eHbJGEfyYoCbyh/view?usp=sharing

## Setup and Installation

### 1. Backend Setup (Node.js)

#### Navigate to the `backend` folder:

```bash
cd backend
```

## Install Backend Dependencies:
Run the following command to install all necessary backend dependencies:

```bash
npm install
```

### Start the Backend Server:
Run the following command to start the backend server:

```bash
nodemon app.js
```

The backend server will now be running at http://localhost:3001.

### 2. Configure MongoDB:

1. **Create a `.env` file in the backend folder**
    - In your project directory, navigate to the `backend` folder.
    - Create a new file named `.env`.

2. **Add your MongoDB URI to the `.env` file**
    - Open the `.env` file and add your MongoDB URI in the following format:

```bash
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster0.mongodb.net/TaskManagement
```

Replace <your-username> and <your-password> with your MongoDB Atlas credentials, or provide your local MongoDB URI if running MongoDB locally.

### 3. **Frontend Setup (React)**
Navigate to the frontend folder:

```bash
cd ../frontend
```

#### Install Frontend Dependencies:
Run the following command to install all necessary frontend dependencies:

```bash
npm install
```

#### Start the Frontend Server:
Run the following command to start the React development server:

```bash
npm run start
```
The frontend will now be running at http://localhost:3000.

### 4. Open the Application
- Open your browser and go to http://localhost:3000 to access the React frontend.
- The backend will be accessible at http://localhost:3001.

## MongoDB Database Structure

The application uses MongoDB to store data in the following two collections:

### tasks Collection
Each document in the tasks collection represents a task with the following fields:

- _id: The unique identifier for the task (automatically generated).
- title: The title of the task (String).
- description: A detailed description of the task (String).
- important: A boolean indicating if the task is marked as important.
- complete: A boolean indicating if the task is marked as complete.
- created_at: The timestamp when the task was created (Date).
- updated_at: The timestamp when the task was last updated (Date).

### users Collection
Each document in the users collection represents a user with the following fields:

- _id: The unique identifier for the user (automatically generated).
- username: The user's chosen username (String).
- email: The user's email address (String).
- password: The user's hashed password (String).
- tasks: An array containing objects that represent individual tasks (Array).

### API Endpoints
#### Auth Routes:
- POST /api/v1/sign-in: Register a new user.
- POST /api/v1/log-in: Log in to an existing account.

#### Task Routes:
- GET /api/v2/get-all-tasks: Get all tasks.
- GET /api/v2/get-imp-tasks: Get important tasks.
- GET /api/v2/get-complete-tasks: Get complete tasks.
- GET /api/v2/get-incomplete-tasks: Get incomplete tasks.
- POST /api/v2/create-task: Create a new task.
- PUT /api/v2/update-task/:id: Update a task by ID.
- PUT /api/v2/update-imp-task/:id: Update a important task by ID.
- PUT /api/v2/update-complete-task/:id: Update a complete task by ID.
- DELETE /api/v2/delete-task/:id: Delete a task by ID.

#### Contributing
Feel free to fork this repository and contribute by submitting pull requests. Make sure to follow the coding standards and include tests for any new features or bug fixes.

### Key Sections:

1. **Project Overview**: Describes the app's functionality and how MongoDB is used to store data.
2. **Technology Stack**: Lists the technologies used (React, Node.js, MongoDB).
3. **Setup Instructions**: Step-by-step instructions on how to clone the repo, install dependencies, and run both the frontend and backend.
4. **MongoDB Structure**: Explains the structure of the `tasks` and `users` collections in MongoDB.
5. **API Endpoints**: Provides a list of all available API endpoints for authentication and task management.
6. **Contributing**: Guidelines on how others can contribute to the project.
7. **License**: Licensing information for the project.

This `README.md` provides a complete guide to setting up and understanding project.
