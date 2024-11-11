import React, {useEffect, useState} from 'react';
import Cards from "../components/Home/Cards";
import axios from "axios";

const CompletedTasks = () => {
    const [Data, setData] = useState();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // Function to fetch tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_ENDPOINT + "/api/v2/get-complete-tasks",
                { headers }
            );
            setData(response.data.data);  // Set tasks from API response
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, [Data]); // Empty dependency array ensures this runs only once when the component is mounted

    return (
        <div>
            <Cards home={"false"} data={Data} />
        </div>
    )
}

export default CompletedTasks;