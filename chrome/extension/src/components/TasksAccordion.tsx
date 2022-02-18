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
    expand?: boolean;
    hideProjects: boolean;
    hideTags: boolean;
    onChange(): void;
}

function TasksAccordion({ type, typeId, name, tasks, expand, hideProjects, hideTags, onChange }: Props) {
    const [isExpanded, setExpanded] = React.useState(expand);
    React.useEffect(() => setExpanded(expand), [expand]);

    const projectIdString = (projectId?: number) => {
        return getCurrentProjects().filter(project => project.id === projectId).join();
    };
    const tagIdsString = (tagIds?: number[]) => {
        return getCurrentTags().filter(tag => tagIds?.includes(tag.id)).join();
    };

    return (
        <Accordion
            expanded={isExpanded}
            onChange={(event, newExpanded) => setExpanded(newExpanded)}
        >
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
                            hideProjects={hideProjects}
                            hideTags={hideTags}
                        />
                    ))}
                    {type !== "completed" &&
                        <TaskContainer
                            newTaskDueDate={getNewTaskDueDate(type)}
                            newTaskProjectId={type === "project" ? typeId : undefined}
                            newTaskTagId={type === "tag" ? typeId : undefined}
                            onChange={onChange}
                            hideProjects={hideProjects}
                            hideTags={hideTags}
                        />
                    }
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default TasksAccordion;
