const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todo-app");

const todoSchema = mongoose.Schema({
    id: Number,
    text: String,
    completed: Boolean
})

const todo = mongoose.model("todo", todoSchema);

module.exports = {
    todo
};