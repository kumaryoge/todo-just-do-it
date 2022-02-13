import React from 'react';
import { Task, TaskListType } from '../types/all';
import { taskListIcon } from '../utils/icons';
import TaskContainer from './TaskContainer';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import { getNewTaskDueDate } from '../utils/common';
import { getCurrentProjects, getCurrentTags } from '../dao/itemDao';

interface Props {
    type: TaskListType;
    typeId?: number;
    name: string;
    tasks: Task[];
    onChange(): void;
}

function TasksAccordion({ type, typeId, name, tasks, onChange }: Props) {
    const projectIdString = (projectId?: number) => {
        return getCurrentProjects().filter(project => project.id === projectId).join();
    };
    const tagIdsString = (tagIds?: number[]) => {
        return getCurrentTags().filter(tag => tagIds?.includes(tag.id)).join();
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore className={type} />}
            >
                <Stack
                    className={type}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    {taskListIcon(type)}
                    <Typography>{name + " (" + tasks.length + ")"}</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    {tasks.map(task => (
                        <TaskContainer
                            key={task.id + "." + task.version + "." + projectIdString(task.projectId) + "." + tagIdsString(task.tagIds)}
                            task={task}
                            onChange={onChange}
                        />
                    ))}
                    {type !== "completed" &&
                        <TaskContainer
                            newTaskDueDate={getNewTaskDueDate(type)}
                            newTaskProjectId={type === "project" ? typeId : undefined}
                            newTaskTagId={type === "tag" ? typeId : undefined}
                            onChange={onChange}
                        />
                    }
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default TasksAccordion;
