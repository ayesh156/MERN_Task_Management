import React from 'react';  // Import React to use JSX
import { Link, useNavigate } from "react-router-dom";  // Import Link and useNavigate for navigation between pages
import axios from "axios";  // Import axios to make HTTP requests
import { useDispatch, useSelector } from "react-redux";  // Import hooks from redux to manage application state
import { authActions } from "../store/auth";  // Import authentication actions to manage login state
import { useFormik } from 'formik';  // Import Formik for form handling and validation
import * as Yup from 'yup';  // Import Yup for form validation schema
import { toast, ToastContainer } from 'react-toastify';  // Import toast notifications to show messages
import "react-toastify/dist/ReactToastify.css";  // Import toast CSS for styling notifications

// Form validation schema with Yup
const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),  // Username is required
    password: Yup.string().required("Password is required")   // Password is required
});

const Signup = () => {
    const history = useNavigate();  // Hook to navigate programmatically
    const dispatch = useDispatch();  // Hook to dispatch actions to the Redux store
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);  // Access authentication state from Redux store

    // Redirect to the homepage if the user is already logged in
    if (isLoggedIn === true) {
        history("/");  // Navigate to the home page
    }

    // Formik setup to handle form state and validation
    const formik = useFormik({
        initialValues: { username: "", password: "" },  // Initial form values for username and password
        validationSchema: validationSchema,  // Attach the validation schema
        onSubmit: async (values) => {  // Handle form submission
            try {
                // Send a POST request to login with username and password
                const response = await axios.post(
                    process.env.REACT_APP_ENDPOINT + "/api/v1/log-in",  // API endpoint to log in
                    values  // Send form data (username and password)
                );
                // Store user id and token in localStorage if login is successful
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token", response.data.token);
                // Dispatch login action to update Redux store state
                dispatch(authActions.login());
                // Navigate to the home page after successful login
                history("/");
            } catch (err) {
                // Show error toast notification if login fails
                toast.error(err.response.data.message, {
                    position: "top-right",  // Position of the toast
                    autoClose: 5000,  // Duration before the toast closes
                    hideProgressBar: false,  // Show progress bar
                    closeOnClick: true,  // Allow closing the toast by clicking on it
                    pauseOnHover: true,  // Pause toast when hovered
                    draggable: true,  // Allow dragging the toast
                    progress: undefined,  // Progress value (not used)
                    theme: "dark",  // Dark theme for the toast
                });
            }
        }
    });

    return (
        <div className="h-[98vh] flex items-center justify-center">
            {/* ToastContainer to display toast notifications */}
            <ToastContainer position="top-right" />

            {/* Form container with styling */}
            <div className="p-4 w-5/6 md:w-3/6 lg:w-2/6 rounded bg-gray-800">
                {/* Login Form Title */}
                <div className="text-3xl text-center font-semibold mb-3">Login</div>

                {/* Username Input Field */}
                <input
                    type="text"
                    placeholder="Username"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="username"
                    value={formik.values.username}  // Bind value to Formik state
                    onChange={formik.handleChange}  // Update Formik state on change
                    onBlur={formik.handleBlur}  // Handle blur (validation trigger)
                />
                {/* Display error message if username is invalid */}
                {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-500 text-sm mt-[-0.7rem]">{formik.errors.username}</div>
                ) : (
                    <div className="text-transparent text-sm mt-[-0.7rem]">text-transparent</div>  // Transparent message when there is no error
                )}

                {/* Password Input Field */}
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="password"
                    value={formik.values.password}  // Bind value to Formik state
                    onChange={formik.handleChange}  // Update Formik state on change
                    onBlur={formik.handleBlur}  // Handle blur (validation trigger)
                />
                {/* Display error message if password is invalid */}
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm mt-[-0.7rem]">{formik.errors.password}</div>
                ) : (
                    <div className="text-transparent text-sm mt-[-0.7rem]">text-transparent</div>
                )}

                {/* Form actions */}
                <div className="w-full gap-3 flex items-center justify-between">
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="px-3 w-36 mt-2 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
                        onClick={formik.handleSubmit}  // Trigger Formik submit handler
                    >
                        Login
                    </button>

                    {/* Signup Link */}
                    <Link to="/signup" className="text-gray-400 hover:text-gray-200 transition-all duration-300">
                        Not having an account? Sign up here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;  // Export the Signup component for use in other parts of the application
