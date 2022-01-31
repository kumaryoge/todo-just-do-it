import React from 'react';
import ItemInput from './ItemInput';
import { Items, Project } from '../types/all';
import Accordion from './Accordion';
import { addItem } from '../dao/itemDao';
import { icon } from '../utils/icons';

interface Props {
    items: Items;
    onChange(): void;
}

function ProjectsContainer({ items, onChange }: Props) {
    return (
        <div>
            <div className="container">
                {items.projects.map(project => (
                    <Accordion
                        key={project.id}
                        type="project"
                        name={project.name}
                        tasks={items.tasks.filter(task => task.projectId === project.id)}
                        onChange={onChange}
                        item={project}
                    />
                ))}
            </div>
            <div className="item-container">
                {icon("add")}
                <ItemInput
                    type="project"
                    onAddItem={value => {
                        const project: Project = { id: 0, name: value };
                        addItem("projects", project, onChange);
                    }}
                />
            </div>
        </div>
    );
}

export default ProjectsContainer;
