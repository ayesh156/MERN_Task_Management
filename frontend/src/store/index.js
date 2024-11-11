// Import configureStore from Redux Toolkit to configure the Redux store
import { configureStore } from "@reduxjs/toolkit";

// Import the authReducer which handles the authentication state from the auth slice
import authReducer from "./auth";

// Configure and create the Redux store
const store = configureStore({
    reducer: {
        // Add the auth slice reducer to the store under the 'auth' key
        auth: authReducer,
    },
});

// Export the configured store to be used in the app
export default store;
