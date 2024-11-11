import React, { useEffect } from 'react'; // Import necessary hooks and components from React
import { Link, useNavigate } from "react-router-dom"; // Import routing components for navigation
import axios from "axios"; // Import axios for making HTTP requests
import { useSelector } from "react-redux"; // Import useSelector hook for accessing Redux state
import { useFormik } from "formik"; // Import Formik for handling form state and validation
import * as Yup from "yup"; // Import Yup for form validation schema
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Signup = () => {
    // Retrieve login state from Redux store
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    // Initialize navigation using useNavigate hook
    const history = useNavigate();

    // Redirect the user to the home page if already logged in
    useEffect(() => {
        if (isLoggedIn) {
            history("/"); // Redirect to home page
        }
    }, [isLoggedIn, history]); // Run the effect when isLoggedIn or history changes

    // Validation schema using Yup for validating the form inputs
    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"), // Validate username
        email: Yup.string().email("Invalid email address").required("Email is required"), // Validate email
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"), // Validate password
    });

    // Initialize Formik with initial values, validation schema, and submit function
    const formik = useFormik({
        initialValues: { // Initial values for the form fields
            username: "",
            email: "",
            password: "",
        },
        validationSchema, // Validation schema defined above
        onSubmit: async (values) => { // Function to handle form submission
            try {
                // Make an API call to submit the signup data
                const response = await axios.post(
                    process.env.REACT_APP_ENDPOINT + "/api/v1/sign-in", // API endpoint
                    values // Send form values
                );
                // Show a success toast message upon successful signup
                toast.success(response.data.message, {
                    position: "top-right", // Position of the toast
                    autoClose: 5000, // Auto close time in milliseconds
                    hideProgressBar: false, // Show progress bar
                    closeOnClick: true, // Close the toast when clicked
                    pauseOnHover: true, // Pause on hover
                    draggable: true, // Make toast draggable
                    progress: undefined, // Progress bar
                    theme: "dark", // Toast theme
                });
                formik.resetForm(); // Reset the form after submission
                setTimeout(() => history("/login"), 2000); // Redirect to login page after 2 seconds
            } catch (err) {
                // Show error toast if the signup fails
                toast.error(err.response?.data?.message || "Signup failed. Please try again.", {
                    position: "top-right", // Position of the toast
                    autoClose: 5000, // Auto close time in milliseconds
                    hideProgressBar: false, // Show progress bar
                    closeOnClick: true, // Close the toast when clicked
                    pauseOnHover: true, // Pause on hover
                    draggable: true, // Make toast draggable
                    progress: undefined, // Progress bar
                    theme: "dark", // Toast theme
                });
            }
        },
    });

    return (
        <div className="h-[98vh] flex items-center justify-center"> {/* Center the content */}
            <ToastContainer position="top-right" /> {/* Display the ToastContainer for toast notifications */}
            <div className="p-4 w-5/6 md:w-3/6 lg:w-2/6 rounded bg-gray-800"> {/* Signup form container */}
                <div className="text-3xl text-center font-semibold mb-3">Signup</div> {/* Title of the form */}

                {/* Form for handling user inputs */}
                <form onSubmit={formik.handleSubmit}>
                    {/* Username input */}
                    <input
                        type="text"
                        placeholder="Username"
                        className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {/* Display error message for username if validation fails */}
                    {formik.touched.username && formik.errors.username ? (
                        <div className="text-red-500 text-sm mt-[-0.7rem]">{formik.errors.username}</div>
                    ) : (
                        <div className="text-transparent text-sm mt-[-0.7rem]">Placeholder</div>
                    )}

                    {/* Email input */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {/* Display error message for email if validation fails */}
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm mt-[-0.7rem]">{formik.errors.email}</div>
                    ) : (
                        <div className="text-transparent text-sm mt-[-0.7rem]">Placeholder</div>
                    )}

                    {/* Password input */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {/* Display error message for password if validation fails */}
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm mt-[-0.7rem]">{formik.errors.password}</div>
                    ) : (
                        <div className="text-transparent text-sm mt-[-0.7rem]">Placeholder</div>
                    )}

                    {/* Signup and login navigation buttons */}
                    <div className="w-full gap-3 flex items-center justify-between">
                        <button type="submit" className="px-3 mt-2 py-2 w-36 bg-blue-400 rounded text-black text-xl font-semibold">
                            Sign Up {/* Submit button */}
                        </button>
                        {/* Link to login page for existing users */}
                        <Link to="/login" className="text-gray-400 hover:text-gray-200 transition-all duration-300">
                            Already have an account? Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
