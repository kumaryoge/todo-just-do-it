import React from 'react';
import ItemInput from './ItemInput';
import { Items } from '../types/all';

interface Props {
    items: Items;
}

function ProjectsContainer({ items }: Props) {
    return (
        <div>
            <div className="container" />
            <ItemInput type="project" />
        </div>
    );
}

export default ProjectsContainer;
