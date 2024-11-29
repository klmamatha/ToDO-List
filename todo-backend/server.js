const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000; // Or any port you prefer

app.use(cors());
app.use(express.json());

let tasks = []; // This is just an in-memory storage for tasks

// Get all tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post("/api/tasks", (req, res) => {
    const newTask = { id: Date.now(), ...req.body };
    tasks.push(newTask);
    res.json(newTask);
});

// Update a task
app.put("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    const updatedTask = { id: Number(id), ...req.body };
    tasks = tasks.map((task) => (task.id === Number(id) ? updatedTask : task));
    res.json(updatedTask);
});

// Delete a task
app.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((task) => task.id !== Number(id));
    res.json({ message: "Task deleted" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
