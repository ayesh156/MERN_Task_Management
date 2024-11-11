import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const history = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            history("/");
        }
    }, [isLoggedIn, history]);

    // Define validation schema using Yup
    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    // Initialize Formik with initial values, validation, and submit function
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    process.env.REACT_APP_ENDPOINT + "/api/v1/sign-in",
                    values
                );
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                formik.resetForm();
                setTimeout(() => history("/login"), 2000); // Redirect after 2 seconds
            } catch (err) {
                toast.error(err.response?.data?.message || "Signup failed. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    });

    return (
        <div className="h-[98vh] flex items-center justify-center">
            <ToastContainer position="top-right" />
            <div className="p-4 w-5/6 md:w-3/6 lg:w-2/6 rounded bg-gray-800">
                <div className="text-3xl text-center font-semibold mb-3">Signup</div>

                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="text-red-500 text-sm mt-[-0.7rem]">{formik.errors.username}</div>
                    ) : (
                        <div className="text-transparent text-sm mt-[-0.7rem]">Placeholder</div>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm mt-[-0.7rem]">{formik.errors.email}</div>
                    ) : (
                        <div className="text-transparent text-sm mt-[-0.7rem]">Placeholder</div>
                    )}

                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm mt-[-0.7rem]">{formik.errors.password}</div>
                    ) : (
                        <div className="text-transparent text-sm mt-[-0.7rem]">Placeholder</div>
                    )}

                    <div className="w-full gap-3 flex items-center justify-between">
                        <button type="submit" className="px-3 mt-2 py-2 w-36 bg-blue-400 rounded text-black text-xl font-semibold">
                            Sign Up
                        </button>
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
