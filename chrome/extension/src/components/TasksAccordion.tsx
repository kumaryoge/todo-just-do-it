import React from 'react';
import { Task, TaskListType } from '../types/all';
import { taskListIcon } from '../utils/icons';
import TaskContainer from './TaskContainer';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';

interface Props {
    type: TaskListType;
    name: string;
    tasks: Task[];
    onChange(): void;
}

function TasksAccordion({ type, name, tasks, onChange }: Props) {
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
                {tasks.map(task => (
                    <TaskContainer
                        key={task.id}
                        task={task}
                        onChange={onChange}
                    />
                ))}
                <TaskContainer onChange={onChange} />
            </AccordionDetails>
        </Accordion>
    );
}

export default TasksAccordion;
