import { useState } from 'react'
import TodoForm from './components/TodoForm.tsx';
import TodoList from './components/TodoList.tsx';
import './App.css'

function App() {
  interface Todo{
    id : number;
    text : string;
    completed : boolean;
  }
  const [ todos, setTodos ] = useState<Todo[]>([]);

  // create state function to add a new to do
  const addTodo = (text : string): void => {
    const newTodo : Todo ={
      id : Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  }

  // state function to delete a todo
  const deleteTodo = (id: number): void =>{
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number): void =>{
    setTodos(
    todos.map((todo) =>
    todo.id === id
    ? {...todo, completed: !todo.completed}
    : todo
    ));
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
