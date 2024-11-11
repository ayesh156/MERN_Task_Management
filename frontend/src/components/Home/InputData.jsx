import React from 'react';
import { RxCross2 } from "react-icons/rx"; // Icon for closing the modal
import axios from "axios";
import { Button } from "@mui/material"; // Material-UI Button for submit
import { useFormik } from "formik"; // Form handling library
import * as Yup from "yup"; // Yup for validation schema
import { ToastContainer, toast } from "react-toastify"; // Toast notifications for success/error
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS import

// InputData component to handle adding or updating tasks
const InputData = ({ inputDiv, setInputDiv, addTask, UpdatedData, setUpdatedData }) => {
    // Define headers for API requests, including authorization
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // Yup validation schema for form fields
    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"), // Title is required
        desc: Yup.string().required("Description is required"), // Description is required
    });

    // Formik setup for handling form state and validation
    const formik = useFormik({
        initialValues: {
            title: UpdatedData.title || "", // Set initial values from UpdatedData if available
            desc: UpdatedData.desc || "" // Set initial values from UpdatedData if available
        },
        validationSchema, // Apply validation schema
        enableReinitialize: true, // Reinitialize form when UpdatedData changes
        onSubmit: async (values) => {
            // Call appropriate function based on whether it's an update or a new task
            if (UpdatedData.id) {
                await handleUpdateTask(values);  // Update existing task
            } else {
                await handleSubmitTask(values);  // Submit new task
            }
        },
    });

    // Handler to submit a new task
    const handleSubmitTask = async (values) => {
        try {
            // Send POST request to create a new task
            const response = await axios.post(
                process.env.REACT_APP_ENDPOINT + "/api/v2/create-task",
                values,
                { headers }
            );
            if (response.status === 200) {
                // Show success message and reset the form
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
                addTask(true); // Refresh tasks
                resetFormAndHide(); // Reset form and hide modal
            }
        } catch (error) {
            // Show error message if the request fails
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

    // Handler to update an existing task
    const handleUpdateTask = async (values) => {
        try {
            // Send PUT request to update the existing task
            const response = await axios.put(
                process.env.REACT_APP_ENDPOINT + `/api/v2/update-task/${UpdatedData.id}`,
                values,
                { headers }
            );
            if (response.status === 200) {
                // Show success message and reset the form
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
                addTask(true); // Refresh tasks
                resetFormAndHide(); // Reset form and hide modal
            }
        } catch (error) {
            // Show error message if the request fails
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

    // Function to reset the form data and hide the input modal
    const resetFormAndHide = () => {
        formik.resetForm(); // Reset form fields to initial state
        setInputDiv("hidden"); // Hide the input modal
        setUpdatedData({ id: "", title: "", desc: "" }); // Clear the updated data
    };

    return (
        <>
            <ToastContainer position="top-left" /> {/* Toast notifications container */}

            {/* Overlay background (used when the modal is open) */}
            <div className={`${inputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>

            {/* Input Form Modal */}
            <div className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className="w-4/6 lg:w-2/6 bg-gray-900 p-4 rounded">
                    {/* Close Button */}
                    <div className="flex justify-end">
                        <button
                            className="text-2xl hover:text-red-600 transition-all duration-300"
                            onClick={resetFormAndHide} // Hide modal on click
                        >
                            <RxCross2 /> {/* Close icon */}
                        </button>
                    </div>

                    {/* Title Input Field */}
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        className="px-3 py-2 rounded w-full bg-gray-700 mt-3"
                        onChange={formik.handleChange} // Update Formik values
                        onBlur={formik.handleBlur} // Mark field as touched
                        value={formik.values.title} // Display Formik value
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="text-red-500 text-sm">{formik.errors.title}</div> // Error message for title
                    )}

                    {/* Description Textarea Field */}
                    <textarea
                        name="desc"
                        cols="30"
                        rows="10"
                        placeholder="Description.."
                        className="px-3 py-2 rounded w-full bg-gray-700 mt-1 mb-2"
                        onChange={formik.handleChange} // Update Formik values
                        onBlur={formik.handleBlur} // Mark field as touched
                        value={formik.values.desc} // Display Formik value
                    ></textarea>
                    {formik.touched.desc && formik.errors.desc && (
                        <div className="text-red-500 text-sm mt-[-0.9rem]">{formik.errors.desc}</div> // Error message for description
                    )}

                    {/* Submit/Update Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        className="px-3 pt-5 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
                        onClick={formik.handleSubmit} // Trigger form submission
                    >
                        {UpdatedData.id === "" ? "Submit" : "Update"} {/* Change button text based on update or submit */}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default InputData;
