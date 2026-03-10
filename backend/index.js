const express = require("express");

const {inputTodo,updateTodo} = require("./types");

const {todo} = require("./db");

const app = express();

app.use(express.json());

const PORT = 3000;
// Things that i would need here
// text, id

app.post("/todo",async function(req, res){
    const createPayLoad = req.body;
    const parsedPayLoad = inputTodo.safeParse(createPayLoad);
    if(!parsedPayLoad.success){
        res.json({message:"The payload is not in the correct format"});
        return;
    }else{
        const newTodo = await todo.create({
            id: Date.now(),
            text: parsedPayLoad.data.text,
            completed: false
        });
        res.json({message:"Todo created",todo:newTodo});
    }

})
app.get('/todos', async function(req, res){
    const todos = await todo.find({});
    res.json({
        todos
    });     

})
    
app.patch('/todos/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
        return res.status(400).json({
            message: "completed must be boolean"
        });
    }

    try {

        const updatedTodo = await todo.findOneAndUpdate(
            { id },
            { completed },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.json(updatedTodo);

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

app.get("/test", (req, res) => {
  res.send("API working");
});

app.delete("/todo/:id", async function (req, res) {
    const id = Number(req.params.id);

    try {
        const deletedTodo = await todo.deleteOne({ id: id });

        if (deletedTodo.deletedCount === 0) {
            return res.json({
                message: "Todo not found"
            });
        }

        res.json({
            message: "Todo deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting todo"
        });
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});