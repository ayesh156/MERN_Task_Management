import React, { useEffect, useState } from 'react'; // Import React and hooks
import { FaEdit } from "react-icons/fa"; // Import icons for edit, delete, and like actions
import { MdDelete } from "react-icons/md";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios"; // Import axios for making HTTP requests
import { Button, Card, CardActionArea, CardContent } from "@mui/material"; // Import MUI components

// Cards component receives props like home, setInputDiv, data, and setUpdatedData
const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
    // Initialize the 'tasks' state to hold task data, initially from the 'data' prop
    const [tasks, setTasks] = useState(data);

    // useEffect hook to update tasks whenever the 'data' prop changes
    useEffect(() => {
        setTasks(data);  // Update tasks with the new 'data' prop
    }, [data]);

    // Set up headers for authentication, using values stored in localStorage
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // Function to handle marking a task as complete or incomplete
    const handleCompleteTask = async (id) => {
        try {
            const response = await axios.put(
                process.env.REACT_APP_ENDPOINT + `/api/v2/update-complete-task/${id}`,
                {},  // Sending empty object since no body is required
                { headers }
            );

            if (response.status === 200) {
                // Update the task state by toggling the 'complete' status
                setTasks(tasks.map(task =>
                    task._id === id ? { ...task, complete: !task.complete } : task
                ));
            }
        } catch (error) {
            console.log(error);  // Log any errors to the console
        }
    };

    // Function to handle marking a task as important or unimportant
    const handleImportant = async (id) => {
        try {
            const response = await axios.put(
                process.env.REACT_APP_ENDPOINT + `/api/v2/update-imp-task/${id}`,
                {},  // Sending empty object since no body is required
                { headers }
            );

            if (response.status === 200) {
                // Update the task state by toggling the 'important' status
                setTasks(tasks.map(task =>
                    task._id === id ? { ...task, important: !task.important } : task
                ));
            }
        } catch (error) {
            console.log(error);  // Log any errors to the console
        }
    };

    // Function to handle updating a task, setting the state for the update form
    const handleUpdate = (id, title, desc) => {
        setInputDiv("fixed");  // Make the update input section visible
        setUpdatedData({ id: id, title: title, desc: desc });  // Pass task data to the parent component
    };

    // Function to handle deleting a task
    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(
                process.env.REACT_APP_ENDPOINT + `/api/v2/delete-task/${id}`,
                { headers }
            );
            if (response.status === 200) {
                // Remove the deleted task from the state
                setTasks(tasks.filter(task => task._id !== id));
            }
        } catch (error) {
            console.log(error);  // Log any errors to the console
        }
    };

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-2 sm:gap-2 lg:gap-4 p-2 sm:p-4">
            {/* Render each task as a Card */}
            {tasks && tasks.map((items, i) => (
                <Card key={i} sx={{ backgroundColor: "#1F2937" }}>

                    <div className="flex flex-col justify-between p-4">
                        <CardContent>
                            <div>
                                <h3 className="text-xl text-white font-semibold">{items.title}</h3>
                                <h3 className="text-gray-300 my-2">{items.desc}</h3>
                            </div>
                            <div className="mt-4 w-full flex items-center">
                                {/* Button to mark the task as complete or incomplete */}
                                <Button
                                    variant="contained"
                                    color={items.complete ? "success" : "error"}
                                    className={"w-3/6"}
                                    onClick={() => handleCompleteTask(items._id)}
                                    sx={{ textTransform: 'none' }}
                                >
                                    {items.complete ? "Completed" : "Incomplete"}
                                </Button>

                                {/* Actions section with icons */}
                                <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                                    {/* Button to toggle task importance */}
                                    <button onClick={() => handleImportant(items._id)}>
                                        {items.important === false ? (
                                            <PiHeartBold />  // Heart outline for non-important
                                        ) : (
                                            <PiHeartFill className="text-red-500" />  // Filled red heart for important
                                        )}
                                    </button>

                                    {/* Edit button, shown only if 'home' prop is true */}
                                    {home !== "false" && (
                                        <button onClick={() => handleUpdate(items._id, items.title, items.desc)}>
                                            <FaEdit />
                                        </button>
                                    )}

                                    {/* Delete button */}
                                    <button onClick={() => deleteTask(items._id)}>
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            ))}

            {/* If 'home' prop is true, display a button to add a new task */}
            {home === "true" && (
                <Card
                    sx={{
                        backgroundColor: "#1F2937",
                        '&:hover': {
                            transform: 'scale(1.05)', // Scale the card on hover
                            transition: 'transform 0.3s ease', // Smooth transition
                        },
                    }}
                >
                    <CardActionArea>
                        <CardContent onClick={() => setInputDiv("fixed")} className="flex flex-col justify-center items-center text-gray-300 cursor-pointer">
                            <IoAddCircleSharp className="text-5xl" />
                            <h2 className="text-2xl mt-4">Add Task</h2>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )}
        </div>
    );
};

export default Cards;
