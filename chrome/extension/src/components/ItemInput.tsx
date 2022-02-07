import React from 'react';
import { Input } from '@mui/material';

interface Props {
    type: "task" | "project" | "tag";
    onAddItem(value: string): void;
}

function ItemInput({ type, onAddItem }: Props) {
    const [value, setValue] = React.useState("");

    return (
        <Input
            className="input"
            type="text"
            placeholder={"Add " + type + ", press enter to save"}
            value={value}
            onChange={event => {
                setValue(event.target.value);
            }}
            onKeyDown={event => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    const value = event.currentTarget.value;
                    if (value) {
                        onAddItem(value);
                        setValue("");
                    }
                }
            }}
            onBlur={() => setValue("")}
            disableUnderline={true}
            multiline={true}
        />
    );
}

export default ItemInput;
