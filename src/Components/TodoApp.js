import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./TodoList";

const API_URL = "http://localhost:5000/api/tasks";

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(API_URL);
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async (task) => {
        try {
            const response = await axios.post(API_URL, task);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const editTask = async (id, updatedTask) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedTask);
            setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
        } catch (error) {
            console.error("Error editing task:", error);
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

// TaskForm component
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
