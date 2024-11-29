const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, default: "pending" },
    comment: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", TaskSchema);
