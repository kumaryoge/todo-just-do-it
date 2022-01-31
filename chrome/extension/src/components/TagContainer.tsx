import React from 'react';
import { deleteItem, updateItem } from '../dao/itemDao';
import { Tag } from '../types/all';
import { icon } from '../utils/icons';
import ItemView from './ItemView';

interface Props {
    tag: Tag;
    onChange(): void;
}

function TagContainer({ tag, onChange }: Props) {
    return (
        <div className="item-container bordered">
            {icon("tag")}
            <ItemView
                type="tag"
                name={tag.name}
                onUpdateItem={value => {
                    tag.name = value;
                    updateItem("tags", tag, onChange);
                }}
            />
            {icon("delete", () => deleteItem("tags", tag, onChange))}
        </div>
    );
}

export default TagContainer;
