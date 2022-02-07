import React from 'react';
import { DeleteOutlined } from '@mui/icons-material';
import { Button, Popover, Typography } from '@mui/material';

interface Props {
    classes: string;
    onClick(): void;
}

function DeleteIcon({ classes, onClick }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<any>(null);

    return (
        <div>
            <DeleteOutlined
                className={classes}
                fontSize="small"
                onClick={event => setAnchorEl(event.currentTarget)}
            />
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                <Typography p={2}>Are you sure?</Typography>
                <Button onClick={onClick}>Yes</Button>
                <Button onClick={() => setAnchorEl(null)}>No</Button>
            </Popover>
        </div>
    );
}

export default DeleteIcon;
