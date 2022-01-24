import React from 'react';

interface Props {
    type: "task" | "project" | "tag";
}

function ItemInput({ type }: Props) {
    return (
        <input type="text" placeholder={"Add a " + type + ", press enter to save"} />
    );
}

export default ItemInput;
