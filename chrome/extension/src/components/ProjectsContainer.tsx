import React from 'react';
import { Items } from '../types/all';
import Accordion from './Accordion';
import ProjectContainer from './ProjectContainer';

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
            <ProjectContainer onChange={onChange} />
        </div>
    );
}

export default ProjectsContainer;
