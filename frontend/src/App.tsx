import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm.tsx';
import TodoList from './components/TodoList.tsx';
import { createTodo,getTodos,deleteTodoAPI,toggleTodo as toggleTodoAPI } from './api/TodoApi.tsx';
import './App.css';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {

  const [ todos, setTodos ] = useState<Todo[]>([]);

  // fetch the todos from the backend upon reload
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodos();
        setTodos(response.todos);
      }
      catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    fetchTodos();
  }
  ,[]);

  // create state function to add a new to do
  const addTodo = async (text : string): Promise<void> => {
    const response = await createTodo(text);
    setTodos([...todos, response.todo]);
  }

  // state function to delete a todo
const deleteTodo = async (id: number): Promise<void> => {
  try {
    await deleteTodoAPI(id);

    setTodos((prev) => prev.filter(todo => todo.id !== id));

  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
};

const toggleTodo = async (id: number): Promise<void> => {
  try {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updatedTodo = await toggleTodoAPI(id, !todo.completed);

    setTodos(prev =>
      prev.map(t =>
        t.id === id ? updatedTodo : t
      )
    );

  } catch (error) {
    console.error("Failed to toggle todo:", error);
  }
};

  return (
    <>
      <div className="container">
          <TodoForm addTodo={addTodo} />
          <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      </div>
    </>
  )
}

export default App
