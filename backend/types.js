const { z } = require("zod");

const inputTodo = z.object({
    text:z.string()
})

const updateTodo = z.object({
    id : z.number(),
})

module.exports = {
    inputTodo: inputTodo,
    updateTodo: updateTodo
};