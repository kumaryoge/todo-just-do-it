import React from 'react';
import { addItem, deleteItem, updateItem } from '../dao/itemDao';
import { Tag } from '../types/all';
import { addIcon, deleteIcon, tagIcon } from '../utils/icons';
import ItemInput from './ItemInput';
import ItemView from './ItemView';
import { Stack } from '@mui/material';

interface Props {
    tag?: Tag;
    onChange(): void;
}

function TagContainer({ tag, onChange }: Props) {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
        >
            {!tag ? addIcon() : tagIcon()}
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
            {tag && deleteIcon(() => deleteItem("tags", tag, onChange))}
        </Stack>
    );
}

export default TagContainer;
