// api/tasks.js
let tasks = [];

export default function handler(req, res) {
    if (req.method === "GET") {
        return res.json(tasks);
    }

    if (req.method === "POST") {
        const newTask = { id: Date.now(), ...req.body };
        tasks.push(newTask);
        return res.json(newTask);
    }

    if (req.method === "PUT") {
        const { id } = req.query;
        const updatedTask = { id: Number(id), ...req.body };
        tasks = tasks.map((task) => (task.id === Number(id) ? updatedTask : task));
        return res.json(updatedTask);
    }

    if (req.method === "DELETE") {
        const { id } = req.query;
        tasks = tasks.filter((task) => task.id !== Number(id));
        return res.json({ message: "Task deleted" });
    }

    return res.status(405).json({ message: "Method not allowed" });
}
