import React from 'react';

interface Props {
    type: "task" | "project" | "tag";
}

const ItemInput: React.FC<Props> = ({ type }) => {
    return (
        <input type="text" placeholder={"Add a " + type + ", press enter to save"} />
    );
}

export default ItemInput;
