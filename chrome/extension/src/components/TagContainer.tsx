import React from 'react';
import { addItem, deleteItem, updateItem } from '../dao/itemDao';
import { Tag } from '../types/all';
import { icon } from '../utils/icons';
import ItemInput from './ItemInput';
import ItemView from './ItemView';

interface Props {
    tag?: Tag;
    onChange(): void;
}

function TagContainer({ tag, onChange }: Props) {
    return (
        <div className="item-container">
            {!tag ? icon("add") : icon("tag")}
            {!tag ?
                <ItemInput
                    type="tag"
                    onAddItem={value => {
                        const tag: Tag = { id: 0, name: value };
                        addItem("tags", tag, onChange);
                    }}
                />
                :
                <ItemView
                    type="tag"
                    name={tag.name}
                    onUpdateItem={value => {
                        tag.name = value;
                        updateItem("tags", tag, onChange);
                    }}
                />
            }
            {tag && icon("delete", () => deleteItem("tags", tag, onChange))}
        </div>
    );
}

export default TagContainer;
