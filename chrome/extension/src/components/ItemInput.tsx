import React from 'react';

interface Props {
    type: "task" | "project" | "tag";
    onAddItem(value: string): void;
}

function ItemInput({ type, onAddItem }: Props) {
    const [value, setValue] = React.useState("");

    return (
        <input
            type="text"
            placeholder={"Add a " + type + ", press enter to save"}
            value={value}
            onChange={event => {
                setValue(event.target.value);
            }}
            onKeyUp={event => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    const value = event.currentTarget.value;
                    if (value) {
                        onAddItem(value);
                        setValue("");
                    }
                }
            }}
        />
    );
}

export default ItemInput;
