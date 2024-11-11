// Import the createSlice function from Redux Toolkit to create a slice of state
import { createSlice } from "@reduxjs/toolkit";

// Create a slice of the Redux store to manage authentication state
const authSlice = createSlice({
    name: "auth", // Name of the slice, which is 'auth' in this case
    initialState: { isLoggedIn: false }, // Initial state of the authentication (user is not logged in by default)
    reducers: {
        // Reducer to handle login action
        login: (state) => {
            state.isLoggedIn = true; // Set isLoggedIn to true when login action is triggered
        },
        // Reducer to handle logout action
        logout: (state) => {
            state.isLoggedIn = false; // Set isLoggedIn to false when logout action is triggered
        },
    },
});

// Export actions generated by createSlice (for dispatching them in components)
export const authActions = authSlice.actions;

// Export the reducer to be used in the store configuration
export default authSlice.reducer;
