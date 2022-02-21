import React from 'react';
import { addItem, deleteItem, updateItem } from '../dao/itemDao';
import { DueDate, Task } from '../types/all';
import { addIcon, completedTaskIcon, deleteIcon, taskIcon } from '../utils/icons';
import ItemInput from './ItemInput';
import ItemView from './ItemView';
import { Stack } from '@mui/material';
import DateSelector from '../utils/DateSelector';
import ProjectSelector from '../utils/ProjectSelector';
import TagsSelector from '../utils/TagsSelector';
import { getNextDueDate } from '../utils/common';

interface Props {
    task?: Task;
    newTaskDueDate?: DueDate;
    newTaskProjectId?: number;
    newTaskTagId?: number;
    hideProjects: boolean;
    hideTags: boolean;
    onChange(): void;
}

function TaskContainer({ task, newTaskDueDate, newTaskProjectId, newTaskTagId, hideProjects, hideTags, onChange }: Props) {
    const [dueDate, setDueDate] = React.useState<DueDate | undefined>(task ? task.dueDate : newTaskDueDate);
    const [projectId, setProjectId] = React.useState<number | undefined>(task ? task.projectId : newTaskProjectId);
    const [tagIds, setTagIds] = React.useState<number[] | undefined>(task ? task.tagIds : (newTaskTagId ? [newTaskTagId] : undefined));

    const toggleCompletion = () => {
        if (task) {
            if (task.dueDate?.repeat) {
                task.dueDate = getNextDueDate(task.dueDate, task.dueDate.repeat);
            } else {
                task.completed = !task.completed;
            }
            updateItem("tasks", task, onChange);
        }
    };

    const updateDueDate = (dueDate?: DueDate) => {
        setDueDate(dueDate);
        if (task) {
            task.dueDate = dueDate;
            updateItem("tasks", task, onChange);
        }
    };

    const updateProjectId = (projectId?: number) => {
        setProjectId(projectId);
        if (task) {
            task.projectId = projectId;
            updateItem("tasks", task, onChange);
        }
    };

    const updateTagIds = (tagIds?: number[]) => {
        setTagIds(tagIds);
        if (task) {
            task.tagIds = tagIds;
            updateItem("tasks", task, onChange);
        }
    };

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
        >
            {!task ? addIcon() :
                (task.completed
                    ? completedTaskIcon(toggleCompletion)
                    : taskIcon(toggleCompletion))
            }
            <Stack width={"100%"}>
                {!task ?
                    <ItemInput
                        type="task"
                        onAddItem={value => {
                            const task: Task = { id: 0, name: value, version: 0 };
                            task.dueDate = dueDate;
                            task.projectId = projectId;
                            task.tagIds = tagIds;
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
                    alignItems="center"
                    spacing={0.5}
                >
                    {task &&
                        <DateSelector
                            completed={task.completed}
                            dueDate={dueDate}
                            onClick={date => updateDueDate(date)}
                        />
                    }
                    {task && !hideProjects &&
                        <ProjectSelector
                            completed={task.completed}
                            projectId={projectId}
                            onClick={id => updateProjectId(id)}
                        />
                    }
                    {task && !hideTags &&
                        <TagsSelector
                            completed={task.completed}
                            tagIds={tagIds}
                            onClick={ids => updateTagIds(ids)}
                        />
                    }
                </Stack>
            </Stack>
            {task && deleteIcon(() => deleteItem("tasks", task, onChange))}
        </Stack>
    );
}

export default TaskContainer;
