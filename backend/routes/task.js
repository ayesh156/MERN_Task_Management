// Importing necessary libraries and models
const express = require("express");
const Task = require("../models/task");
const router = require("./user");
const User = require("../models/User");
const {authenticateToken} = require("./auth");

// POST route to create a new task
router.post("/create-task", authenticateToken, async (req, res) => {
    try {
        // Destructuring title and description from the request body
        const {title, desc} = req.body;

        // Extracting the user ID from the request headers
        const {id} = req.headers;

        // Creating a new task instance with the provided title and description
        const newTask = new Task({title: title, desc: desc});

        // Saving the new task to the database
        const saveTask = await newTask.save();

        // Extracting the task ID
        const taskId = saveTask._id;

        // Updating the user document to associate the new task with the user
        await User.findByIdAndUpdate(id, {$push: {tasks: taskId._id}});

        // Sending a success response
        res.status(200).json({message: "Task successfully created"});
    } catch (error) {
        console.log(error);
        // Handling any errors and sending a 400 response
        res.status(400).json({message: "Internal Server Error"});
    }
});

// GET route to fetch all tasks for a user
router.get("/get-all-tasks", authenticateToken, async (req, res) => {
    try {
        // Extracting user ID from request headers
        const {id} = req.headers;

        // Fetching user data and populating associated tasks, sorted by creation date
        const userData = await User.findById(id).populate({
            path: "tasks",
            options: {sort: {createdAt: -1}}
        });

        // Sending the user data as the response
        res.status(200).json({data: userData});
    } catch (error) {
        console.log(error);
        // Handling any errors and sending a 400 response
        res.status(400).json({message: "Internal Server Error"});
    }
});

// DELETE route to delete a task
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
    try {
        // Extracting the task ID from the request parameters and user ID from headers
        const {id} = req.params;
        const userId = req.headers.id;

        // Deleting the task by ID
        await Task.findByIdAndDelete(id);

        // Updating the user to remove the deleted task from their task list
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });

        // Sending a success response
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        // Handling any errors and sending a 400 response
        res.status(400).json({message: "Internal Server Error"});
    }
});

// PUT route to update a task
router.put("/update-task/:id", authenticateToken, async (req, res) => {
    try {
        // Extracting the task ID from the request parameters and the updated data from the body
        const {id} = req.params;
        const {title, desc} = req.body;

        // Updating the task by ID with the new title and description
        await Task.findByIdAndUpdate(id, { title: title, desc: desc });

        // Sending a success response
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.log(error);
        // Handling any errors and sending a 400 response
        res.status(400).json({message: "Internal Server Error"});
    }
});

// PUT route to toggle the importance of a task
router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
    try {
        // Extracting the task ID from the request parameters
        const {id} = req.params;

        // Fetching the task to check its current importance status
        const TaskData = await Task.findById(id);
        const ImpTask = TaskData.important;

        // Toggling the importance status of the task
        await Task.findByIdAndUpdate(id, { important: !ImpTask });

        // Sending a success response
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.log(error);
        // Handling any errors and sending a 400 response
        res.status(400).json({message: "Internal Server Error"});
    }
});

// PUT route to toggle the completion status of a task
router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
    try {
        // Extracting the task ID from the request parameters
        const {id} = req.params;

        // Fetching the task to check its current completion status
        const TaskData = await Task.findById(id);
        const CompleteTask = TaskData.complete;

        // Toggling the completion status of the task
        await Task.findByIdAndUpdate(id, { complete: !CompleteTask });

        // Sending a success response
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.log(error);
        // Handling any errors and sending a 400 response
        res.status(400).json({message: "Internal Server Error"});
    }
});

// GET route to fetch all important tasks for a user
router.get("/get-imp-tasks", authenticateToken, async (req, res) => {
    try {
        // Extracting user ID from request headers
        const {id} = req.headers;

        // Fetching user data and populating only important tasks, sorted by creation date
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: { important: true },
            options: {sort: {createdAt: -1}}
        });

        // Sending the important task data as the response
        res.status(200).json({data: Data.tasks});
    } catch (error) {
        console.log(error);
        // Handling any errors and sending a 400 response
        res.status(400).json({message: "Internal Server Error"});
    }
});

// GET route to fetch all completed tasks for a user
router.get("/get-complete-tasks", authenticateToken, async (req, res) => {
    try {
        // Extracting user ID from request headers
        const {id} = req.headers;

        // Fetching user data and populating only completed tasks, sorted by creation date
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: { complete: true },
            options: {sort: {createdAt: -1}}
        });

        // Sending the completed task data as the response
        res.status(200).json({data: Data.tasks});
    } catch (error) {
        console.log(error);
        // Handling any errors and sending a 400 response
        res.status(400).json({message: "Internal Server Error"});
    }
});

// GET route to fetch all incomplete tasks for a user
router.get("/get-incomplete-tasks", authenticateToken, async (req, res) => {
    try {
        // Extracting user ID from request headers
        const {id} = req.headers;

        // Fetching user data and populating only incomplete tasks, sorted by creation date
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: { complete: false },
            options: {sort: {createdAt: -1}}
        });

        // Sending the incomplete task data as the response
        res.status(200).json({data: Data.tasks});
    } catch (error) {
        console.log(error);
        // Handling any errors and sending a 400 response
        res.status(400).json({message: "Internal Server Error"});
    }
});

// Exporting the router to use in other parts of the application
module.exports = router;
