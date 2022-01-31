import React from 'react';
import ItemInput from './ItemInput';
import { Items, Tag } from '../types/all';
import Accordion from './Accordion';
import { addItem } from '../dao/itemDao';
import { icon } from '../utils/icons';

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
                        items={items}
                        taskFilter={(tasks) => tasks.filter(task => task.tagIds && task.tagIds.includes(tag.id))}
                        onChange={onChange}
                        item={tag}
                    />
                ))}
            </div>
            <div className="item-container">
                {icon("add")}
                <ItemInput
                    type="tag"
                    onAddItem={value => {
                        const tag: Tag = { id: 0, name: value };
                        addItem("tags", tag, onChange);
                    }}
                />
            </div>
        </div>
    );
}

export default TagsContainer;
