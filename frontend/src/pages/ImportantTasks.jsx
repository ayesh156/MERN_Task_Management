import React, { useEffect, useState } from 'react';  // Importing React, useState, and useEffect hooks
import Cards from "../components/Home/Cards";  // Importing the Cards component to display the tasks
import axios from "axios";  // Importing axios for making API requests

const ImportantTasks = () => {
    // State hook to store tasks data fetched from the API
    const [Data, setData] = useState();

    // Setting up the headers for the API request, including authentication details from localStorage
    const headers = {
        id: localStorage.getItem("id"),  // Fetching user ID from localStorage
        authorization: `Bearer ${localStorage.getItem("token")}`,  // Fetching the token from localStorage
    };

    // Function to fetch tasks from the API
    const fetchTasks = async () => {
        try {
            // Making an API request to fetch the important tasks
            const response = await axios.get(
                process.env.REACT_APP_ENDPOINT + "/api/v2/get-imp-tasks",  // The API endpoint URL is from the environment variable
                { headers }  // Passing the headers for authentication
            );
            // If the request is successful, update the 'Data' state with the fetched tasks
            setData(response.data.data);
        } catch (error) {
            // Catch any errors and log them
            console.error("Error fetching tasks:", error);
        }
    };

    // useEffect hook to fetch tasks when the component mounts (or when 'Data' changes)
    useEffect(() => {
        fetchTasks();  // Calling fetchTasks function to load tasks from the API
    }, [Data]);  // The effect depends on 'Data', so it will run again whenever 'Data' changes

    return (
        <div>
            {/* Passing the tasks data to the Cards component for display */}
            <Cards home={"false"} data={Data} />
        </div>
    );
}

export default ImportantTasks;  // Exporting the ImportantTasks component for use in other parts of the application
