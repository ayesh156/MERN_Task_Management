// Importing mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Define an asynchronous function `conn` to connect to MongoDB
const conn = async () => {
    try {
        // Attempt to establish a connection to the MongoDB database using the URI from environment variables
        const response = await mongoose.connect(process.env.MONGO_URI);

        // If the connection is successful, log a confirmation message
        if (response) {
            console.log("connected to DB");
        }
    } catch (error) {
        // If an error occurs during the connection attempt, log the error
        console.log(error);
    }
};

// Calling the `conn` function to initiate the database connection
conn();
