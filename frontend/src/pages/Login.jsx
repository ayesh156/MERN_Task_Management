import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Form validation schema with Yup
const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
});

const Signup = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    // Redirect if already logged in
    if (isLoggedIn === true) {
        history("/");
    }

    // Formik setup
    const formik = useFormik({
        initialValues: { username: "", password: "" },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    process.env.REACT_APP_ENDPOINT + "/api/v1/log-in",
                    values
                );
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token", response.data.token);
                dispatch(authActions.login());
                history("/");
            } catch (err) {
                toast.error(err.response.data.message, {
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
                <div className="text-3xl text-center font-semibold mb-3">Login</div>

                {/* Username Input */}
                <input
                    type="text"
                    placeholder="Username"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-500 text-sm mt-[-0.7rem]">{formik.errors.username}</div>
                ) : (
                    <div className="text-transparent text-sm mt-[-0.7rem]">text-transparent</div>  // Transparent message
                )}

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm mt-[-0.7rem]">{formik.errors.password}</div>
                ): (
                    <div className="text-transparent text-sm mt-[-0.7rem]">text-transparent</div>
                )}

                <div className="w-full gap-3 flex items-center justify-between">
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="px-3 w-36 mt-2 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
                        onClick={formik.handleSubmit}
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

export default Signup;
