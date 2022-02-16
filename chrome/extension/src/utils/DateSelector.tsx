import React from 'react';
import { Button, Chip, Popover, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { dateIcon } from './icons';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DueDate } from '../types/all';
import { isPastDate, toDueDate, toNormalDate } from './common';

interface Props {
    dueDate?: DueDate;
    onClick(dueDate?: DueDate): void;
}

function DateSelector({ dueDate, onClick }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [date, setDate] = React.useState<Date | null>(dueDate ? toNormalDate(dueDate) : null);
    const dateFormat: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" };
    const dateFormatLong: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

    return (
        <div>
            <Tooltip
                title={<Typography>{(date && date.toLocaleDateString(navigator.language, dateFormatLong)) || "Add a due date to this task"}</Typography>}
                enterDelay={500}
                leaveDelay={200}
            >
                <Chip
                    label={<Typography fontSize="small">{(date && date.toLocaleDateString(navigator.language, dateFormat)) || "+"}</Typography>}
                    color={date && isPastDate(date) ? "error" : "default"}
                    variant="outlined"
                    size="small"
                    icon={dateIcon()}
                    onClick={event => setAnchorEl(event.currentTarget)}
                />
            </Tooltip>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        value={date}
                        onChange={newDate => {
                            setAnchorEl(null);
                            setDate(newDate);
                            newDate && onClick(toDueDate(newDate));
                        }}
                        renderInput={params => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Stack direction="row">
                    <Button fullWidth={true} onClick={() => {
                        setAnchorEl(null);
                        setDate(null);
                        onClick(undefined);
                    }} disabled={date === null}>Clear</Button>
                    <Button fullWidth={true} onClick={() => setAnchorEl(null)}>Cancel</Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default DateSelector;
