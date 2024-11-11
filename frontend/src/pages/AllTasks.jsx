import React, { useEffect, useState } from 'react';
import Cards from "../components/Home/Cards";  // Import Cards component to display task cards
import { IoAddCircleSharp } from "react-icons/io5";  // Icon for adding a task
import InputData from "../components/Home/InputData";  // Import InputData component for adding/editing tasks
import axios from "axios";  // Axios for making API requests

const AllTasks = () => {
    // State to toggle visibility of the input form for adding a task
    const [inputDiv, setInputDiv] = useState("hidden");

    // State to store the tasks data fetched from the API
    const [Data, setData] = useState([]);

    // State to trigger a re-fetch after a new task is added
    const [isTaskAdded, setIsTaskAdded] = useState(false);

    // State to hold the updated task data when editing a task
    const [UpdatedData, setUpdatedData] = useState({
        id: "",
        title: "",
        desc: "",
    });

    // Headers used for authentication in API requests
    const headers = {
        id: localStorage.getItem("id"),  // Fetch user ID from localStorage
        authorization: `Bearer ${localStorage.getItem("token")}`,  // Fetch token for authorization
    };

    // Function to fetch tasks from the API
    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_ENDPOINT + "/api/v2/get-all-tasks",  // Make GET request to fetch tasks
                { headers }  // Pass headers with the request for authentication
            );
            setData(response.data.data);  // Set the tasks data in the state
        } catch (error) {
            console.error("Error fetching tasks:", error);  // Log any errors in the console
        }
    };

    // Fetch tasks when the component mounts
    useEffect(() => {
        if (localStorage.getItem("id") && localStorage.getItem("token")) {
            fetchTasks();  // Call fetchTasks if user ID and token are available
        }
    }, []);  // Empty dependency array ensures this runs only once on mount

    // Function to handle adding a task (triggered when the user clicks the add button)
    const addTask = () => {
        setIsTaskAdded(true);  // Set state to trigger fetching tasks after adding a new one
    };

    // Re-fetch tasks when a new task has been added successfully
    useEffect(() => {
        if (isTaskAdded) {
            fetchTasks();  // Re-fetch tasks after adding a new one
            setIsTaskAdded(false);  // Reset the state after the re-fetch
        }
    }, [isTaskAdded]);  // Runs whenever isTaskAdded changes

    return (
        <>
            <div>
                {/* Button to open the input form for adding a new task */}
                <div className="w-full flex justify-end py-2 px-4">
                    <button onClick={() => setInputDiv("fixed")}>  {/* On click, display the input form */}
                        <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
                    </button>
                </div>
                {/* Render Cards component and pass the tasks data */}
                {Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData} />}
            </div>

            {/* Render the InputData component, passing necessary props for task adding/editing */}
            <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} addTask={addTask} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData} />
        </>
    );
};

export default AllTasks;
