import React from 'react';
import { addItem, deleteItem, updateItem } from '../dao/itemDao';
import { Task } from '../types/all';
import { addIcon, completedTaskIcon, dateIcon, deleteIcon, projectIcon, tagIcon, taskIcon } from '../utils/icons';
import ItemInput from './ItemInput';
import ItemView from './ItemView';
import { Stack } from '@mui/material';

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
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
            mb={2}
        >
            {!task ? addIcon() :
                (task.completed
                    ? completedTaskIcon(toggleCompletion)
                    : taskIcon(toggleCompletion))
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
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {!(task && task.completed) && dateIcon()}
                {!(task && task.completed) && projectIcon()}
                {!(task && task.completed) && tagIcon()}
                {task && deleteIcon(() => deleteItem("tasks", task, onChange))}
            </Stack>
        </Stack>
    );
}

export default TaskContainer;
