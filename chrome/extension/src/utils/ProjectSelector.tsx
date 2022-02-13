import React from 'react';
import { Button, Chip, FormControl, FormControlLabel, FormLabel, Popover, Radio, RadioGroup, Stack } from '@mui/material';
import { projectIcon } from './icons';
import { Project } from '../types/all';
import { currentItems } from '../dao/itemDao';

interface Props {
    projectId?: number;
    onClick(projectId?: number): void;
}

function getProjectById(projectId: number): Project | undefined {
    for (const project of currentItems.projects) {
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
            <Chip
                label={project?.name || "..."}
                variant="outlined"
                size="small"
                icon={projectIcon()}
                onClick={event => setAnchorEl(event.currentTarget)}
            />
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
                        {currentItems.projects.map(project =>
                            <FormControlLabel value={project.id} label={project.name} control={<Radio />} />
                        )}
                    </RadioGroup>
                </FormControl>
                <Stack direction="row">
                    <Button fullWidth={true} onClick={() => {
                        setAnchorEl(null);
                        setProject(undefined);
                        onClick(undefined);
                    }}>Clear</Button>
                    <Button fullWidth={true} onClick={() => setAnchorEl(null)}>Cancel</Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default ProjectSelector;
