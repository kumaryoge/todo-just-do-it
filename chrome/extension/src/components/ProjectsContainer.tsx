import React from 'react';
import { Items } from '../types/all';
import { taskListIcon } from '../utils/icons';
import ProjectContainer from './ProjectContainer';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';

interface Props {
    items: Items;
    onChange(): void;
}

function ProjectsContainer({ items, onChange }: Props) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore className="project" />}
            >
                <Stack
                    className="project"
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    {taskListIcon("project")}
                    <Typography>{"Projects (" + items.projects.length + ")"}</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    {items.projects.map(project => (
                        <ProjectContainer
                            key={project.id}
                            project={project}
                            onChange={onChange}
                        />
                    ))}
                    <ProjectContainer onChange={onChange} />
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default ProjectsContainer;
