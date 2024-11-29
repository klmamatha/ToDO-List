import React from "react";
import TodoItem from "./TodoItem";


const TodoList = ({ tasks, onDeleteTask, onEditTask }) => {
    return (
        <div>
            {tasks.map((task) => (
                <TodoItem
                    key={task.id}
                    task={task}
                    onDelete={onDeleteTask}
                    onEdit={onEditTask}
                />
            ))}
        </div>
    );
};

export default TodoList;
