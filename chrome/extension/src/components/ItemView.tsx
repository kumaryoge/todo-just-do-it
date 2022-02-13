import React from 'react';
import { Input } from '@mui/material';

interface Props {
    type: "task" | "project" | "tag";
    name: string;
    onUpdateItem(value: string): void;
    completed?: boolean;
}

function ItemView({ type, name, onUpdateItem, completed }: Props) {
    const [value, setValue] = React.useState(name);
    const [isFocus, setFocus] = React.useState(false);

    return (
        <Input
            className={completed ? "is-completed" : ""}
            type="text"
            placeholder={"Edit " + type + ", press enter to save"}
            value={value}
            onChange={event => {
                setValue(event.target.value);
            }}
            onKeyDown={event => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    const value = event.currentTarget.value;
                    if (value && value !== name) {
                        name = value;
                        onUpdateItem(value);
                        event.currentTarget.blur();
                    } else if (value === name) {
                        event.currentTarget.blur();
                    }
                }
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => {
                setFocus(false);
                setValue(name);
            }}
            readOnly={!isFocus || completed}
            disableUnderline={true}
            multiline={true}
            fullWidth={true}
        />
    );
}

export default ItemView;
