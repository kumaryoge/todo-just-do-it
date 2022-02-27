import React from 'react';
import { DeleteOutlined } from '@mui/icons-material';
import { Button, Popover, Stack, Typography } from '@mui/material';

interface Props {
    type: "task" | "project" | "tag";
    classes: string;
    onClick(): void;
}

function DeleteIcon({ type, classes, onClick }: Props) {
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
                <Typography textAlign="center" p={2}>{`Delete ${type}?`}</Typography>
                <Stack direction="row">
                    <Button fullWidth={true} onClick={onClick}>Yes</Button>
                    <Button fullWidth={true} onClick={() => setAnchorEl(null)}>No</Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default DeleteIcon;
