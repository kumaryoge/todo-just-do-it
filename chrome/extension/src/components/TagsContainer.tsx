import React from 'react';
import ItemInput from './ItemInput';
import { Items } from '../types/all';
import TasksAccordion from './TasksAccordion';

interface Props {
    items: Items;
}

function TagsContainer({ items }: Props) {
    return (
        <div>
            <div className="container">
                {items.tags.map(tag => (
                    <TasksAccordion
                        key={tag.id}
                        type="tag"
                        name={tag.name}
                        items={items}
                        taskFilter={(tasks) => tasks.filter(task => task.tagIds && task.tagIds.includes(tag.id))}
                    />
                ))}
            </div>
            <ItemInput type="tag" />
        </div>
    );
}

export default TagsContainer;
