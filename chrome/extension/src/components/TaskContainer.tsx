import React from 'react';
import { addItem, deleteItem, updateItem } from '../dao/itemDao';
import { Task } from '../types/all';
import { icon } from '../utils/icons';
import ItemInput from './ItemInput';
import ItemView from './ItemView';

interface Props {
    task?: Task;
    onChange(): void;
}

function TaskContainer({ task, onChange }: Props) {
    const toggleCompletion = () => {
        if (task) {
            task.completed = !task.completed;
            updateItem("tasks", task, onChange);
        }
    };

    return (
        <div className="item-container">
            {!task ? icon("add") :
                (task.completed
                    ? icon("completedTask", toggleCompletion)
                    : icon("task", toggleCompletion))
            }
            {!task ?
                <ItemInput
                    type="task"
                    onAddItem={value => {
                        const task: Task = { id: 0, name: value };
                        addItem("tasks", task, onChange);
                    }}
                />
                :
                <ItemView
                    type="task"
                    name={task.name}
                    onUpdateItem={value => {
                        task.name = value;
                        updateItem("tasks", task, onChange);
                    }}
                    completed={task.completed}
                />
            }
            {!(task && task.completed) && icon("date")}
            {!(task && task.completed) && icon("project")}
            {!(task && task.completed) && icon("tags")}
            {task && icon("delete", () => deleteItem("tasks", task, onChange))}
        </div>
    );
}

export default TaskContainer;
