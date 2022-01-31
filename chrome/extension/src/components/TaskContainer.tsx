import React from 'react';
import { deleteItem, updateItem } from '../dao/itemDao';
import { Project, Tag, Task } from '../types/all';
import { icon } from '../utils/icons';
import ItemView from './ItemView';

interface Props {
    task: Task;
    allProjects: Project[];
    allTags: Tag[];
    onChange(): void;
}

function TaskContainer({ task, allProjects, allTags, onChange }: Props) {
    const toggleCompletion = () => {
        task.completed = !task.completed;
        updateItem("tasks", task, onChange);
    };

    return (
        <div className="item-container">
            {task.completed ? icon("completedTask", toggleCompletion) : icon("task", toggleCompletion)}
            <ItemView
                type="task"
                name={task.name}
                onUpdateItem={value => {
                    task.name = value;
                    updateItem("tasks", task, onChange);
                }}
                completed={task.completed}
            />
            {!task.completed && icon("date")}
            {!task.completed && icon("project")}
            {!task.completed && icon("tags")}
            {icon("delete", () => deleteItem("tasks", task, onChange))}
        </div>
    );
}

export default TaskContainer;
