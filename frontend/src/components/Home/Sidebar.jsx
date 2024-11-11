import React, { useEffect } from 'react';
import { CgNotes } from "react-icons/cg"; // Importing icons for task types
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Used for navigation within the app
import { useDispatch } from "react-redux"; // For dispatching actions related to authentication
import { authActions } from "../../store/auth"; // Importing auth actions for login/logout
import axios from "axios"; // For making API requests
import { useTheme } from '@mui/material/styles'; // Material-UI theme for responsive design
import { Button, Stack, useMediaQuery } from "@mui/material"; // Material-UI components for layout and design
import { FiLogOut } from "react-icons/fi"; // Icon for logout button

const Sidebar = ({ userData }) => {
    const theme = useTheme(); // Getting the current theme
    const data = [ // Sidebar menu data
        {
            title: "All tasks",
            icon: <CgNotes />, // Icon for all tasks
            link: "/"
        },
        {
            title: "Important tasks",
            icon: <MdLabelImportant />, // Icon for important tasks
            link: "/importantTasks"
        },
        {
            title: "Completed tasks",
            icon: <FaCheckDouble />, // Icon for completed tasks
            link: "/completedTasks"
        },
        {
            title: "Incompleted tasks",
            icon: <TbNotebookOff />, // Icon for incomplete tasks
            link: "/incompletedTasks"
        },
    ];

    const location = useLocation(); // Hook to get the current route
    const dispatch = useDispatch(); // Hook for dispatching actions
    const history = useNavigate(); // Hook for navigating to different pages
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is small (for responsive design)

    // Logout function: clears local storage and navigates to signup page
    const logout = () => {
        dispatch(authActions.logout()); // Dispatch logout action
        localStorage.clear("id"); // Clear user ID from localStorage
        localStorage.clear("token"); // Clear user token from localStorage
        history("/signup"); // Redirect to signup page after logout
    };

    const headers = {
        id: localStorage.getItem("id"), // Get user ID from localStorage
        authorization: `Bearer ${localStorage.getItem("token")}`, // Get user token from localStorage
    };

    useEffect(() => {
        // Fetch tasks data when component is mounted
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:3001/api/v2/get-all-tasks", // API endpoint for fetching tasks
                { headers } // Send headers with the request
            );
            userData(response.data.data); // Pass fetched data to parent component
        };
        if (localStorage.getItem("id") && localStorage.getItem("token")) { // Ensure user is logged in
            fetch(); // Call fetch function to get tasks data
        }
    }, []); // Empty dependency array to run effect only once when component is mounted

    return (
        // Main container for the sidebar
        <Stack mx={isSmallScreen ? 0 : 1} height="100vh">
            {/* Stack to arrange sidebar items vertically */}
            <Stack
                spacing={2}
                mt={2}
                direction="column"
                alignItems="center"  // Center items in Stack
                flexGrow={1} // Takes up all available space, pushing logout button to bottom
            >
                {/* Iterate over each sidebar item */}
                {data.map((items, i) => (
                    <Link to={items.link} key={i} style={{
                        width: "100%",
                        textDecoration: "none",
                        color: location.pathname === "/customer" ? "primary" : "white", // Change color based on active route
                    }}>
                        <Button
                            key={i}
                            disableElevation
                            variant={location.pathname === items.link ? "contained" : "contained"} // Highlight the active link
                            color={location.pathname === items.link ? "primary" : "none"} // Set active link color
                            startIcon={items.icon} // Add an icon to the button
                            sx={{
                                paddingY: '0.8rem',
                                width: '100%', // Make Button full-width within Stack
                                maxWidth: '300px',  // Optional: limit button width
                                display: "flex",
                                justifyContent: "flex-start",  // Align icon and text to the left
                                color: location.pathname === items.link ? "primary" : "inherit", // Adjust text color based on active link
                                "& .MuiButton-startIcon": {
                                    color: "white", // Set the color of the start icon to white
                                },
                            }}
                        >
                            {isSmallScreen ? "" : items.title} {/* Hide text on small screens */}
                        </Button>
                    </Link>
                ))}
            </Stack>
            {/* Logout button at the bottom of the sidebar */}
            <Button
                color="error"
                sx={{ paddingY: '0.8rem', marginBottom: '1rem' }} // Button padding and margin for spacing
                variant="contained"
                onClick={logout} // Logout function on click
            >
                {isSmallScreen ? <FiLogOut className="text-xl" /> : "Log Out"} {/* Show icon on small screens, text on large screens */}
            </Button>
        </Stack>
    );
};

export default Sidebar;
