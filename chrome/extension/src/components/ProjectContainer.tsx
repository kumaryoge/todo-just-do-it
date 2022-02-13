import React from 'react';
import { addItem, deleteItem, updateItem } from '../dao/itemDao';
import { Project } from '../types/all';
import { addIcon, deleteIcon, projectIcon } from '../utils/icons';
import ItemInput from './ItemInput';
import ItemView from './ItemView';
import { Stack } from '@mui/material';

interface Props {
    project?: Project;
    onChange(): void;
}

function ProjectContainer({ project, onChange }: Props) {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
        >
            {!project ? addIcon() : projectIcon()}
            {!project ?
                <ItemInput
                    type="project"
                    onAddItem={value => {
                        const project: Project = { id: 0, name: value, version: 0 };
                        addItem("projects", project, onChange);
                    }}
                />
                :
                <ItemView
                    type="project"
                    name={project.name}
                    onUpdateItem={value => {
                        project.name = value;
                        updateItem("projects", project, onChange);
                    }}
                />
            }
            {project && deleteIcon(() => deleteItem("projects", project, onChange))}
        </Stack>
    );
}

export default ProjectContainer;
