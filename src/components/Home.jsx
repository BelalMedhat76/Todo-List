import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';


const Home = () => {
    const {
        todos,
        isEditing,
        editValue,
        addTodo,
        deleteTodo,
        startEditing,
        saveEdit,
        setEditValue,
    } = useContext(TodoContext);

    const [newTodo, setNewTodo] = useState('');

    return (
        <>
        <div className="todo-app">
            <div className="todo-container">
            
               <h1 className="title">Todo List</h1>
               
                <div className="input-container">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter a task"
                        className="todo-input"
                    />
                    <button className="add-button" onClick={() => addTodo(newTodo)}>
                        Add Todo
                    </button>
                </div>
                <ul className="todo-list">
                    {todos.map((todo, index) => (
                        <li key={index} className="todo-item">
                            {isEditing === index ? (
                                <>
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        className="todo-input-edit"
                                    />
                                    <button className="save-button" onClick={() => saveEdit(index)}>
                                        Save
                                    </button>
                                    <button className="cancel-button" onClick={() => startEditing(null)}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="todo-text">{todo}</span>
                                    <div className="AvtionsBtn">
                                    <button className="edit-button" onClick={() => startEditing(index)}>
                                        Edit
                                    </button>
                                    <button className="delete-button" onClick={() => deleteTodo(index)}>
                                        Delete
                                    </button> 
                                    </div>
                                  
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
};

export default Home;
