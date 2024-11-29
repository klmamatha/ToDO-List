import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
const API_URL = "https://to-do-list-back-rouge.vercel.app/api/tasks";

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${API_URL}`);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Add a new task
    const addTask = async (task) => {
        try {
            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });
            const newTask = await response.json();
            setTasks((prevTasks) => [...prevTasks, newTask]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Delete a task
    const deleteTask = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Edit a task
    const editTask = async (id, updatedTask) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            });
            const updatedData = await response.json();
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === id ? updatedData : task))
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <TaskForm onAddTask={addTask} />
            <TodoList tasks={tasks} onDeleteTask={deleteTask} onEditTask={editTask} />
        </div>
    );
};

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("pending");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAddTask({ title, status, comment });
            setTitle("");
            setStatus("pending");
            setComment("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
            </select>
            <textarea
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TodoApp;
