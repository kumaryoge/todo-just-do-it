import React from 'react';
import { deleteItem, updateItem } from '../dao/itemDao';
import { Project } from '../types/all';
import { icon } from '../utils/icons';
import ItemView from './ItemView';

interface Props {
    project: Project;
    onChange(): void;
}

function ProjectContainer({ project, onChange }: Props) {
    return (
        <div className="item-container bordered">
            {icon("project")}
            <ItemView
                type="project"
                name={project.name}
                onUpdateItem={value => {
                    project.name = value;
                    updateItem("projects", project, onChange);
                }}
            />
            {icon("delete", () => deleteItem("projects", project, onChange))}
        </div>
    );
}

export default ProjectContainer;
