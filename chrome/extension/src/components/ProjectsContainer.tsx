import React from 'react';
import ItemInput from './ItemInput';
import { Items, Project } from '../types/all';
import TasksAccordion from './TasksAccordion';
import { addItem } from '../dao/itemDao';

interface Props {
    items: Items;
    onAddProject(project: Project): void;
}

function ProjectsContainer({ items, onAddProject }: Props) {
    return (
        <div>
            <div className="container">
                {items.projects.map(project => (
                    <TasksAccordion
                        key={project.id}
                        type="project"
                        name={project.name}
                        items={items}
                        taskFilter={(tasks) => tasks.filter(task => task.projectId === project.id)}
                    />
                ))}
            </div>
            <ItemInput
                type="project"
                onAddItem={value => {
                    const project: Project = { id: 0, name: value };
                    addItem("projects", project, () => onAddProject(project));
                }}
            />
        </div>
    );
}

export default ProjectsContainer;
