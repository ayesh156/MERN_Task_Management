import React, { useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputData = ({ inputDiv, setInputDiv, addTask, UpdatedData, setUpdatedData }) => {
    // Define headers for API requests
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // Yup validation schema
    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        desc: Yup.string().required("Description is required"),
    });

    // Formik setup with initial values, validation, and submit handlers
    const formik = useFormik({
        initialValues: {
            title: UpdatedData.title || "",
            desc: UpdatedData.desc || ""
        },
        validationSchema,
        enableReinitialize: true, // Update form values when UpdatedData changes
        onSubmit: async (values) => {
            if (UpdatedData.id) {
                await handleUpdateTask(values);  // Call update task if an ID is present
            } else {
                await handleSubmitTask(values);  // Otherwise, submit a new task
            }
        },
    });

    // Handler for submitting a new task
    const handleSubmitTask = async (values) => {
        try {
            const response = await axios.post(
                process.env.REACT_APP_ENDPOINT + "/api/v2/create-task",
                values,
                { headers }
            );
            if (response.status === 200) {
                toast.success(response?.data?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                addTask(true);
                resetFormAndHide();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create task.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.error(error);
        }
    };

    // Handler for updating an existing task
    const handleUpdateTask = async (values) => {
        try {
            const response = await axios.put(
                process.env.REACT_APP_ENDPOINT + `/api/v2/update-task/${UpdatedData.id}`,
                values,
                { headers }
            );
            if (response.status === 200) {
                toast.success(response?.data?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                addTask(true);
                resetFormAndHide();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update task", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.error(error);
        }
    };

    // Function to reset form data and hide the input div
    const resetFormAndHide = () => {
        formik.resetForm();
        setInputDiv("hidden");
        setUpdatedData({ id: "", title: "", desc: "" });
    };

    return (
        <>
            <ToastContainer position="top-left" />

            {/* Overlay Background */}
            <div className={`${inputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>

            {/* Input Form Modal */}
            <div className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className="w-4/6 lg:w-2/6 bg-gray-900 p-4 rounded">
                    <div className="flex justify-end">
                        <button
                            className="text-2xl hover:text-red-600 transition-all duration-300"
                            onClick={resetFormAndHide}
                        >
                            <RxCross2 />
                        </button>
                    </div>

                    {/* Title Input Field */}
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        className="px-3 py-2 rounded w-full bg-gray-700 mt-3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-500 text-sm">{formik.errors.title}</div>
                    ) : (
                        <div className="text-transparent text-sm">Placeholder</div>
                    )}

                    {/* Description Textarea Field */}
                    <textarea
                        name="desc"
                        cols="30"
                        rows="10"
                        placeholder="Description.."
                        className="px-3 py-2 rounded w-full bg-gray-700 mt-1 mb-2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.desc}
                    ></textarea>
                    {formik.touched.desc && formik.errors.desc ? (
                        <div className="text-red-500 text-sm mt-[-0.9rem]">{formik.errors.desc}</div>
                    ) : (
                        <div className="text-transparent text-sm mt-[-0.9rem]">Placeholder</div>
                        )}

                    {/* Submit/Update Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        className="px-3 pt-5 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
                        onClick={formik.handleSubmit}
                    >
                        {UpdatedData.id === "" ? "Submit" : "Update"}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default InputData;
