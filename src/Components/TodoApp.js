import React, { useState } from "react";
import TodoList from "./TodoList";

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, { id: Date.now(), ...task }]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const editTask = (id, updatedTask) => {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
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
