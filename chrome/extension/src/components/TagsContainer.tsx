import React from 'react';
import { Items } from '../types/all';
import TagContainer from './TagContainer';

interface Props {
    items: Items;
    onChange(): void;
}

function TagsContainer({ items, onChange }: Props) {
    return (
        <div>
            {items.tags.map(tag => (
                <TagContainer
                    key={tag.id}
                    tag={tag}
                    onChange={onChange}
                />
            ))}
            <TagContainer onChange={onChange} />
        </div>
    );
}

export default TagsContainer;
