const BASE_URL = "http://localhost:3000";

export const createTodo = async(text:string) => {
    const response = await fetch(`${BASE_URL}/todo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({text})
});
    if (!response.ok) {
        throw new Error("Failed to create todo");
    }
    return response.json();
}

export const getTodos = async() => {
    const response = await fetch(`${BASE_URL}/todos`);
    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }
    return response.json();
}

// create one to change toggle
export const toggleTodo = async(id: number, completed: boolean) => {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({completed}),
    });
    if (!response.ok) {
        throw new Error("Failed to toggle todo");
    }
    return response.json();
}

export const deleteTodoAPI = async (id: number) => {
    const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete todo");
    }

    return response.json();
};