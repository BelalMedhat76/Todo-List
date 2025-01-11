import React from 'react';
import { TodoProvider } from './context/TodoContext';
import './App.css'
import Home from './components/Home';

function App() {
    return (
        <TodoProvider>
            <div style={{ padding: '20px' }}>
            
                <Home />
            </div>
        </TodoProvider>
    );
}

export default App;
