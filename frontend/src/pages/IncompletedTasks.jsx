import React, { useEffect, useState } from 'react';  // Importing React, useState, and useEffect hooks
import Cards from "../components/Home/Cards";  // Importing the Cards component to display tasks
import axios from "axios";  // Importing axios to make API requests

const IncompletedTasks = () => {
    // State hook to store tasks data fetched from the API
    const [Data, setData] = useState();

    // Setting up headers for the API request, including the authentication token from localStorage
    const headers = {
        id: localStorage.getItem("id"),  // Fetching the user ID from localStorage
        authorization: `Bearer ${localStorage.getItem("token")}`,  // Fetching the authorization token from localStorage
    };

    // Function to fetch tasks from the API
    const fetchTasks = async () => {
        try {
            // Making an API request to fetch incomplete tasks
            const response = await axios.get(
                process.env.REACT_APP_ENDPOINT + "/api/v2/get-incomplete-tasks",  // Endpoint for fetching incomplete tasks
                { headers }  // Sending the authentication headers with the request
            );
            // If the API request is successful, set the 'Data' state with the fetched tasks
            setData(response.data.data);
        } catch (error) {
            // If there's an error in the API request, log it to the console
            console.error("Error fetching tasks:", error);
        }
    };

    // useEffect hook to fetch tasks when the component mounts (or when 'Data' changes)
    useEffect(() => {
        fetchTasks();  // Call the function to fetch tasks from the API
    }, [Data]);  // This hook will run every time the 'Data' state changes

    return (
        <div>
            {/* Passing the fetched tasks to the Cards component to display them */}
            <Cards home={"false"} data={Data} />
        </div>
    );
}

export default IncompletedTasks;  // Exporting the IncompletedTasks component to use it elsewhere in the app
