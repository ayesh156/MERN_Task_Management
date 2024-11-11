import React, {useEffect, useState} from 'react';
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {PiHeartBold, PiHeartFill} from "react-icons/pi";
import {IoAddCircleSharp} from "react-icons/io5";
import axios from "axios";
import {Button, Card, CardActionArea, CardContent} from "@mui/material";

const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
    // Initialize tasks state with the received data prop
    const [tasks, setTasks] = useState(data);

    useEffect(() => {
        setTasks(data);  // Update tasks when data prop changes
    }, [data]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }

    const handleCompleteTask = async (id) => {
        try {
            const response = await axios.put(
                process.env.REACT_APP_ENDPOINT + `/api/v2/update-complete-task/${id}`,
                {},
                { headers }
            );

            if (response.status === 200) {
                // Toggle the complete status of the task in the state
                setTasks(tasks.map(task =>
                    task._id === id ? { ...task, complete: !task.complete } : task
                ));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleImportant = async (id) => {
        try {
            const response = await axios.put(
                process.env.REACT_APP_ENDPOINT + `/api/v2/update-imp-task/${id}`,
                {},
                { headers }
            );

            if (response.status === 200) {
                // Toggle the important status of the task in the state
                setTasks(tasks.map(task =>
                    task._id === id ? { ...task, important: !task.important } : task
                ));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = (id, title, desc) => {
        setInputDiv("fixed");
        setUpdatedData({ id: id, title: title, desc: desc });
    };

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
            console.log(error);
        }
    };

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-2 sm:gap-2 lg:gap-4 p-2 sm:p-4">
            {tasks && tasks.map((items, i) => (
                <Card key={i} sx={{ backgroundColor: "#1F2937" }}>

                        <div className="flex flex-col justify-between p-4">

                        <CardContent>
                                <div>
                                    <h3 className="text-xl text-white font-semibold">{items.title}</h3>
                                    <h3 className="text-gray-300 my-2">{items.desc}</h3>
                                </div>
                                <div className="mt-4 w-full flex items-center">
                                    <Button variant="contained" color={items.complete ? "success" : "error"}
                                        className={"w-3/6"}
                                        onClick={() => handleCompleteTask(items._id)}
                                        sx={{ textTransform: 'none' }}  // Prevents automatic uppercase transformation
                                    >
                                        {items.complete ? "Completed" : "Incomplete"}
                                    </Button>
                                    <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                                        <button onClick={() => handleImportant(items._id)}>
                                            {items.important === false ? (
                                                <PiHeartBold/>
                                            ) : (
                                                <PiHeartFill className="text-red-500"/>
                                            )}

                                        </button>
                                        {home !== "false" && (
                                            <button onClick={() => handleUpdate(items._id, items.title, items.desc)}>
                                                <FaEdit/>
                                            </button>
                                        )}

                                        <button onClick={() => deleteTask(items._id)}><MdDelete/></button>
                                    </div>
                                </div>
                        </CardContent>
                        </div>
                </Card>

            ))}
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

                                <IoAddCircleSharp className="text-5xl"/>
                                <h2 className="text-2xl mt-4">Add Task</h2>

                        </CardContent>
                    </CardActionArea>
                </Card>
            )}
        </div>
    );
}

export default Cards;