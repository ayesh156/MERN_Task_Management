// Import necessary modules
const express = require("express");  // Import the Express library
const app = express();              // Initialize an Express application instance
require("dotenv").config();         // Load environment variables from .env file
require("./conn/conn");             // Import the database connection (assumed to be in "conn/conn.js")
const cors = require("cors");       // Import the CORS middleware to enable cross-origin requests
const UserAPI = require("./routes/user"); // Import the User-related routes
const TaskAPI = require("./routes/task"); // Import the Task-related routes

// Middleware setup
app.use(cors());                    // Use the CORS middleware to allow cross-origin requests
app.use(express.json());            // Parse incoming requests with JSON payloads

// Routes setup
app.use("/api/v1", UserAPI);        // Mount the UserAPI routes under the "/api/v1" path
app.use("/api/v2", TaskAPI);        // Mount the TaskAPI routes under the "/api/v2" path

// Default route for the root URL
app.use("/", (req, res) => {
    res.send("Hello from backend side");  // Send a response message when the root route ("/") is accessed
});

// Set the server port
const PORT = process.env.PORT || 3001;  // Use the port from the environment variables or fallback to 3001

// Start the server
app.listen(PORT, () => {
    console.log("Server started on port " + PORT);  // Log a message when the server is successfully started
});
