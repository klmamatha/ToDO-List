const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Error fetching tasks" });
    }
});

// Add a new task
router.post("/", async (req, res) => {
    const { title, status, comment } = req.body;
    try {
        const newTask = new Task({ title, status, comment });
        await newTask.save();
        res.json(newTask);
    } catch (err) {
        res.status(500).json({ error: "Error adding task" });
    }
});

// Edit a task
router.put("/:id", async (req, res) => {
    const { title, status, comment } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, status, comment },
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: "Error updating task" });
    }
});

// Delete a task
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting task" });
    }
});

module.exports = router;
