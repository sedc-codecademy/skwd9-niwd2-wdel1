const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: String,
    }
});

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;