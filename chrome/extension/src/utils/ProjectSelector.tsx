import React from 'react';
import { Button, Chip, FormControl, FormControlLabel, FormLabel, Popover, Radio, RadioGroup, Stack, Tooltip, Typography } from '@mui/material';
import { projectIcon } from './icons';
import { Project } from '../types/all';
import { getCurrentProjects } from '../dao/itemDao';
import { TOOLTIP_ENTER_DELAY, TOOLTIP_LEAVE_DELAY, truncate } from './common';

interface Props {
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

function ProjectSelector({ projectId, onClick }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [project, setProject] = React.useState<Project | undefined>(projectId ? getProjectById(projectId) : undefined);

    return (
        <div>
            <Tooltip
                title={<Typography>{project?.name || "Add this task to a project"}</Typography>}
                enterDelay={TOOLTIP_ENTER_DELAY}
                leaveDelay={TOOLTIP_LEAVE_DELAY}
            >
                <Chip
                    label={<Typography fontSize="small">{(project && truncate(project.name)) || "+"}</Typography>}
                    variant="outlined"
                    size="small"
                    icon={projectIcon()}
                    onClick={event => setAnchorEl(event.currentTarget)}
                />
            </Tooltip>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                <FormControl sx={{ p: 2 }}>
                    <FormLabel>Project</FormLabel>
                    <RadioGroup
                        value={project?.id}
                        onChange={(event) => {
                            setAnchorEl(null);
                            const projectId: number = +event.target.value;
                            setProject(getProjectById(projectId));
                            onClick(projectId);
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
                    <Button fullWidth={true} onClick={() => {
                        setAnchorEl(null);
                        setProject(undefined);
                        onClick(undefined);
                    }} disabled={project === undefined}>Clear</Button>
                    <Button fullWidth={true} onClick={() => setAnchorEl(null)}>Cancel</Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default ProjectSelector;
