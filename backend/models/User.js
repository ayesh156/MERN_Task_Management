// Import mongoose library to work with MongoDB
const mongoose = require('mongoose');

// Define a schema for the 'user' model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    tasks: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'task',
        }
    ],
});

// Export the 'User' model, which is based on the 'userSchema'
module.exports = mongoose.model('User', userSchema);