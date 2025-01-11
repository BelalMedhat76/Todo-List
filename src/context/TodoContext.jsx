import React, { createContext, useState, useEffect } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [editValue, setEditValue] = useState('');

    // Fetch todos from an API on component mount
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5'); // Fetch 5 todos
                const data = await response.json();
                setTodos(data.map(todo => todo.title)); // Store only the titles
            } catch (error) {
                console.error('Failed to fetch todos:', error);
            }
        };

        fetchTodos();
    }, []); // Empty dependency array ensures it runs only once

    // Add a new todo
    const addTodo = (newTodo) => {
        if (newTodo.trim() === '') return;
        setTodos([...todos, newTodo]);
    };

    // Delete a todo
    const deleteTodo = (indexToDelete) => {
        setTodos(todos.filter((_, index) => index !== indexToDelete));
    };

    // Start editing a todo
    const startEditing = (index) => {
        setIsEditing(index);
        setEditValue(todos[index]);
    };

    // Save an edited todo
    const saveEdit = (index) => {
        const updatedTodos = todos.map((todo, i) => (i === index ? editValue : todo));
        setTodos(updatedTodos);
        setIsEditing(null);
        setEditValue('');
    };

    return (
        <TodoContext.Provider
            value={{
                todos,
                isEditing,
                editValue,
                addTodo,
                deleteTodo,
                startEditing,
                saveEdit,
                setEditValue,
                setIsEditing,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
