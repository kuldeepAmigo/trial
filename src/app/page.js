// app/page.js
'use client'
import { useEffect, useState } from 'react';

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await fetch('/api/todos');
        const data = await response.json();
        setTodos(data);
    };

    const addTodo = async () => {
        if (!task) return;
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
        });
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
        setTask('');
    };

    const deleteTodo = async (id) => {
        await fetch('/api/todos', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-md rounded-lg p-6 w-1/3'>
                <h1 className='text-2xl font-bold mb-4 text-center'>Todo App</h1>
                <div className='flex mb-4'>
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Add a new task"
                        className='border border-gray-300 rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button 
                        onClick={addTodo} 
                        className='bg-blue-500 text-white rounded-r-md p-2 hover:bg-blue-600 transition duration-200'
                    >
                        Add
                    </button>
                </div>
                <ul className='space-y-2'>
                    {todos.map(todo => (
                        <li key={todo.id} className='flex justify-between items-center bg-gray-50 p-2 rounded-md shadow'>
                            <span className='text-gray-800'>{todo.task}</span>
                            <button 
                                onClick={() => deleteTodo(todo.id)} 
                                className='bg-red-500 text-white rounded-md p-1 hover:bg-red-600 transition duration-200'
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}