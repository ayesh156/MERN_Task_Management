// Import necessary React and Redux hooks, and components for routing
import React, { useEffect } from 'react';
import Home from "./pages/Home"; // Home page component
import AllTasks from "./pages/AllTasks"; // All tasks page component
import ImportantTasks from "./pages/ImportantTasks"; // Important tasks page component
import CompletedTasks from "./pages/CompletedTasks"; // Completed tasks page component
import IncompletedTasks from "./pages/IncompletedTasks"; // Incomplete tasks page component
import Signup from "./pages/Signup"; // Signup page component
import Login from "./pages/Login"; // Login page component
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for dispatching actions and selecting state
import { authActions } from "./store/auth"; // Redux actions related to authentication
import { Route, Routes, useNavigate } from "react-router-dom"; // React Router for navigation and routing

const App = () => {
    // useNavigate is used for programmatically navigating between routes
    const history = useNavigate();

    // useSelector to get the `isLoggedIn` state from the Redux store
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    // useDispatch to dispatch actions to Redux store
    const dispatch = useDispatch();

    // useEffect hook to run the login logic when the component is mounted
    useEffect(() => {
        // Check if the `id` and `token` are stored in localStorage, indicating the user is logged in
        if (localStorage.getItem("id") && localStorage.getItem("token")) {
            dispatch(authActions.login()); // Dispatch login action if the user is logged in
        } else if (isLoggedIn === false) {
            // If the user is not logged in, redirect to the signup page
            history("/signup");
        }
    }, [isLoggedIn, dispatch]); // Dependencies: isLoggedIn, dispatch, and history

    return (
        // Main div with background color and text styling using Tailwind CSS
        <div className="bg-gray-900 text-white min-h-screen p-2 relative">
            {/* Routes component to handle routing between pages */}
            <Routes>
                {/* Default route */}
                <Route exact path="/" element={<Home />}>
                    {/* Nested routes under Home */}
                    <Route exact path="/" element={<AllTasks />} />
                    <Route exact path="/importantTasks" element={<ImportantTasks />} />
                    <Route exact path="/completedTasks" element={<CompletedTasks />} />
                    <Route exact path="/incompletedTasks" element={<IncompletedTasks />} />
                </Route>
                {/* Signup route */}
                <Route exact path="/signup" element={<Signup />} />
                {/* Login route */}
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
