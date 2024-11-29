import React, { useState } from "react";

const TodoItem = ({ task, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const handleEditChange = (field, value) => {
        setEditedTask({ ...editedTask, [field]: value });
    };

    const handleSave = () => {
        onEdit(task.id, editedTask);
        setIsEditing(false);
    };

    return (
        <div className={`todo-item ${task.status}`}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => handleEditChange("title", e.target.value)}
                    />
                    <select
                        value={editedTask.status}
                        onChange={(e) => handleEditChange("status", e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <textarea
                        value={editedTask.comment}
                        onChange={(e) => handleEditChange("comment", e.target.value)}
                    ></textarea>
                    <button className="edit-btn" onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <h3>{task.title}</h3>
                    <p>Status: {task.status}</p>
                    <p>Comment: {task.comment}</p>
                    <div className="buttons">
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                        <button className="delete-btn" onClick={() => onDelete(task.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoItem;