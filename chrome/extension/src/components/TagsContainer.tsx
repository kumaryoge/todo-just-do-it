import React from 'react';
import { Items } from '../types/all';
import Accordion from './Accordion';
import TagContainer from './TagContainer';

interface Props {
    items: Items;
    onChange(): void;
}

function TagsContainer({ items, onChange }: Props) {
    return (
        <div>
            <div className="container">
                {items.tags.map(tag => (
                    <Accordion
                        key={tag.id}
                        type="tag"
                        name={tag.name}
                        tasks={items.tasks.filter(task => task.tagIds && task.tagIds.includes(tag.id))}
                        onChange={onChange}
                        item={tag}
                    />
                ))}
            </div>
            <TagContainer onChange={onChange} />
        </div>
    );
}

export default TagsContainer;
