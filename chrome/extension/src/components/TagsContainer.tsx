import React from 'react';
import ItemInput from './ItemInput';
import { Items } from '../types/all';

interface Props {
    items: Items;
}

function TagsContainer({ items }: Props) {
    return (
        <div>
            <div className="container" />
            <ItemInput type="tag" />
        </div>
    );
}

export default TagsContainer;
