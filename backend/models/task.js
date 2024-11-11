// Import mongoose library to work with MongoDB
const mongoose = require('mongoose');
// Define a schema for the 'task' model
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
        unique: true
    },
    important: {
        type: Boolean,
        default: false,
    },
    complete: {
        type: Boolean,
        default: false,
    },

},{timestamps: true}
);

// Export the 'task' model, which is based on the 'taskSchema'
module.exports = mongoose.model('task', taskSchema);