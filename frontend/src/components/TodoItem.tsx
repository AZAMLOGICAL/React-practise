type Todo = {
    id : number;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    todo : Todo;
    deleteTodo : (id: number) => void;
    toggleTodo : (id: number) => void;
}
function TodoItem ({ todo, deleteTodo, toggleTodo }: TodoItemProps){
    return (
    <li className="todo-item">
        <div className="todo-left">
            <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>toggleTodo(todo.id)}
            />
            <span
            className="todo-text"
            style = {{
                textDecoration: todo.completed ? "line-through" : "none",
                marginLeft : "10px"
             }}
            >
            {todo.text}
             </span>

        </div>
        <button className="delete-btn" onClick={() => deleteTodo(todo.id)} style={{ marginLeft: "10px" }}>Delete</button>
    </li>
    );
}

export default TodoItem;