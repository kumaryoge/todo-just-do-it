import React from 'react';
import { Task, TaskListType } from '../types/all';
import { taskListIcon } from '../utils/icons';
import TaskContainer from './TaskContainer';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import { getNewTaskDueDate } from '../utils/common';

interface Props {
    type: TaskListType;
    typeId?: number;
    name: string;
    tasks: Task[];
    onChange(): void;
}

function TasksAccordion({ type, typeId, name, tasks, onChange }: Props) {
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
                            key={task.id + "." + task.version}
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
