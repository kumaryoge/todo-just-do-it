import React from 'react';
import { addItem, deleteItem, updateItem } from '../dao/itemDao';
import { Project } from '../types/all';
import { icon } from '../utils/icons';
import ItemInput from './ItemInput';
import ItemView from './ItemView';

interface Props {
    project?: Project;
    onChange(): void;
}

function ProjectContainer({ project, onChange }: Props) {
    return (
        <div className={"item-container " + (project ? "bordered" : "")}>
            {!project ? icon("add") : icon("project")}
            {!project ?
                <ItemInput
                    type="project"
                    onAddItem={value => {
                        const project: Project = { id: 0, name: value };
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
            {project && icon("delete", () => deleteItem("projects", project, onChange))}
        </div>
    );
}

export default ProjectContainer;
