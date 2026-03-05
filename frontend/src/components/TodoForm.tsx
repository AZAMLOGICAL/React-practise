import { useState } from "react";

type Props = {
    addTodo : (text: string) => void;
}
function TodoForm({addTodo}: Props ){
    // specify the state
    const [text, setText] = useState("");

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();

        if (!text.trim()) return;

        addTodo(text);
        setText("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a task"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="add-btn">Add</button>
        </form>
    )
}

export default TodoForm;