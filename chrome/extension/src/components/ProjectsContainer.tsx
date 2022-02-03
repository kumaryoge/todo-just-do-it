import React from 'react';
import { Items } from '../types/all';
import ProjectContainer from './ProjectContainer';

interface Props {
    items: Items;
    onChange(): void;
}

function ProjectsContainer({ items, onChange }: Props) {
    return (
        <div>
            {items.projects.map(project => (
                <ProjectContainer
                    key={project.id}
                    project={project}
                    onChange={onChange}
                />
            ))}
            <ProjectContainer onChange={onChange} />
        </div>
    );
}

export default ProjectsContainer;
