import React, { useEffect, useState } from 'react';
import Cards from "../components/Home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/Home/InputData";
import axios from "axios";

const AllTasks = () => {
    const [inputDiv, setInputDiv] = useState("hidden");
    const [Data, setData] = useState([]);
    const [isTaskAdded, setIsTaskAdded] = useState(false);  // State to trigger fetch after task is added
    const [UpdatedData, setUpdatedData] = useState({
        id: "",
        title: "",
        desc: "",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // Function to fetch tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_ENDPOINT + "/api/v2/get-all-tasks",
                { headers }
            );
            setData(response.data.data);  // Set tasks from API response
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Fetch tasks on component mount
    useEffect(() => {
        if (localStorage.getItem("id") && localStorage.getItem("token")) {
            fetchTasks();
        }
    }, []); // Empty dependency array ensures this runs only once when the component is mounted

    // Function to handle adding a task
    const addTask = () => {
       setIsTaskAdded(true);  // Mark that a task was added
    };

    // Refetch tasks if a task was added successfully
    useEffect(() => {
        if (isTaskAdded) {
            fetchTasks();  // Re-fetch tasks
            setIsTaskAdded(false);  // Reset state after refetch
        }
    }, [isTaskAdded]);  // Runs whenever isTaskAdded changes

    return (
        <>
            <div>
                <div className="w-full flex justify-end py-2 px-4">
                    <button onClick={() => setInputDiv("fixed")}>
                        <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
                    </button>
                </div>
                {Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData} />}
            </div>
            <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} addTask={addTask} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData} />
        </>
    );
};

export default AllTasks;
