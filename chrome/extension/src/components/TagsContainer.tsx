import React from 'react';
import ItemInput from './ItemInput';
import { Items, Tag } from '../types/all';
import TasksAccordion from './TasksAccordion';
import { addItem } from '../dao/itemDao';

interface Props {
    items: Items;
    onAddTag(tag: Tag): void;
}

function TagsContainer({ items, onAddTag }: Props) {
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
            <div className="input-container">
                <ItemInput
                    type="tag"
                    onAddItem={value => {
                        const tag: Tag = { id: 0, name: value };
                        addItem("tags", tag, () => onAddTag(tag));
                    }}
                />
            </div>
        </div>
    );
}

export default TagsContainer;
