// Import necessary libraries and files
import React from 'react'; // React for building the UI components
import ReactDOM from 'react-dom/client'; // ReactDOM for rendering React components into the DOM
import './index.css'; // Import global styles for the app
import App from './App'; // The root App component that contains all other components
import reportWebVitals from './reportWebVitals'; // For measuring app performance
import { Provider } from "react-redux"; // Redux provider to supply the Redux store to the app
import store from "./store"; // Redux store configuration
import { BrowserRouter as Router } from "react-router-dom"; // React Router for client-side routing

// Get the root element in the HTML where the React app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React app into the root element
root.render(
    <React.StrictMode>
        {/* StrictMode helps highlight potential problems in the application, like deprecated lifecycle methods. */}
        <Router>
            {/* Router is used to handle the navigation between different pages */}
            <Provider store={store}>
                {/* The Provider component makes the Redux store available to all components in the app */}
                <App />
            </Provider>
        </Router>
    </React.StrictMode>
);

// reportWebVitals is used to measure and log the app's performance metrics (optional)
reportWebVitals();
