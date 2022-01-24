import React from 'react';
import ItemInput from './ItemInput';
import { Items } from '../types/all';
import TasksAccordion from './TasksAccordion';

interface Props {
    items: Items;
}

function ProjectsContainer({ items }: Props) {
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
            <ItemInput type="project" />
        </div>
    );
}

export default ProjectsContainer;
