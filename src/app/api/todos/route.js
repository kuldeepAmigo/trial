// app/api/todos/route.js
import mysql from 'mysql2/promise'; // Use the promise-based version

const dbConfig = {
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'Adarsh@123', // replace with your MySQL password
    database: 'todo_app',
};

export async function GET() {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [results] = await connection.query('SELECT * FROM todos');
        return new Response(JSON.stringify(results), { status: 200 });
    } catch (err) {
        console.error('Error fetching todos:', err);
        return new Response('Error fetching todos', { status: 500 });
    } finally {
        await connection.end();
    }
}

export async function POST(request) {
    const { task } = await request.json();
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [result] = await connection.query('INSERT INTO todos (task) VALUES (?)', [task]);
        return new Response(JSON.stringify({ id: result.insertId, task }), { status: 201 });
    } catch (err) {
        console.error('Error adding todo:', err);
        return new Response('Error adding todo', { status: 500 });
    } finally {
        await connection.end();
    }
}

export async function DELETE(request) {
    const { id } = await request.json();
    const connection = await mysql.createConnection(dbConfig);
    try {
        await connection.query('DELETE FROM todos WHERE id = ?', [id]);
        return new Response(null, { status: 204 });
    } catch (err) {
        console.error('Error deleting todo:', err);
        return new Response('Error deleting todo', { status: 500 });
    } finally {
        await connection.end();
    }
}