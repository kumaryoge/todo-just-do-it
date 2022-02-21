import React from 'react';
import { Button, Chip, FormControl, FormControlLabel, FormLabel, Popover, Radio, RadioGroup, Stack, Tooltip, Typography } from '@mui/material';
import { projectIcon } from './icons';
import { Project } from '../types/all';
import { getCurrentProjects } from '../dao/itemDao';
import { TOOLTIP_ENTER_DELAY, TOOLTIP_LEAVE_DELAY, truncate } from './common';

interface Props {
    completed?: boolean;
    projectId?: number;
    onClick(projectId?: number): void;
}

function getProjectById(projectId: number): Project | undefined {
    for (const project of getCurrentProjects()) {
        if (project.id === projectId) {
            return project;
        }
    }
}

function ProjectSelector({ completed, projectId, onClick }: Props) {
    const savedProject = projectId ? getProjectById(projectId) : undefined;

    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [project, setProject] = React.useState<Project | undefined>(savedProject);

    return (
        <div>
            <Tooltip
                title={<Typography>{savedProject?.name || "Add this task to a project"}</Typography>}
                enterDelay={TOOLTIP_ENTER_DELAY}
                leaveDelay={TOOLTIP_LEAVE_DELAY}
            >
                <Chip
                    label={<Typography fontSize="small">{(savedProject && truncate(savedProject.name)) || "+"}</Typography>}
                    variant="outlined"
                    size="small"
                    icon={projectIcon()}
                    onClick={event => setAnchorEl(event.currentTarget)}
                    sx={completed ? { color: "gray" } : {}}
                />
            </Tooltip>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                    setAnchorEl(null);
                    setProject(savedProject);
                }}
            >
                <FormControl sx={{ p: 2 }}>
                    <FormLabel>Project</FormLabel>
                    <RadioGroup
                        key={project?.id}
                        value={project?.id}
                        onChange={(event) => {
                            const projectId: number = +event.target.value;
                            setProject(getProjectById(projectId));
                        }}
                    >
                        {getCurrentProjects().map(project =>
                            <FormControlLabel value={project.id} label={project.name} control={<Radio />} />
                        )}
                        {getCurrentProjects().length === 0 &&
                            <Typography color="gray" pt={2}>No projects available! Please add a project in the Projects list first.</Typography>
                        }
                    </RadioGroup>
                </FormControl>
                <Stack direction="row">
                    <Button
                        fullWidth={true}
                        onClick={() => setProject(undefined)}
                        disabled={project === undefined}
                    >
                        Reset
                    </Button>
                    <Button
                        fullWidth={true}
                        onClick={() => {
                            setAnchorEl(null);
                            onClick(project?.id);
                        }}
                        disabled={project?.id === savedProject?.id}
                    >
                        Save
                    </Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default ProjectSelector;
