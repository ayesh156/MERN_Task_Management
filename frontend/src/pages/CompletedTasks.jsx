import React, { useEffect, useState } from 'react';
import Cards from "../components/Home/Cards";  // Import Cards component to display tasks
import axios from "axios";  // Axios for making API requests

const CompletedTasks = () => {
    // State to store the data of completed tasks fetched from the API
    const [Data, setData] = useState();

    // Headers for making authorized API requests (using the user's ID and token from localStorage)
    const headers = {
        id: localStorage.getItem("id"),  // Retrieve user ID from localStorage
        authorization: `Bearer ${localStorage.getItem("token")}`,  // Retrieve and set the authorization token
    };

    // Function to fetch completed tasks from the API
    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_ENDPOINT + "/api/v2/get-complete-tasks",  // API endpoint to get completed tasks
                { headers }  // Pass headers (ID and token) for authorization
            );
            setData(response.data.data);  // Update the state with the fetched tasks data
        } catch (error) {
            console.error("Error fetching tasks:", error);  // Log any errors in the console
        }
    };

    // Fetch tasks when the component mounts
    useEffect(() => {
        fetchTasks();  // Call the fetchTasks function to get completed tasks
    }, [Data]);  // Note: `Data` dependency here might cause unnecessary re-fetching. Consider removing it.

    return (
        <div>
            {/* Render the Cards component and pass the completed tasks data */}
            <Cards home={"false"} data={Data} />
        </div>
    );
};

export default CompletedTasks;
