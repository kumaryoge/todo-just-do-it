import React from 'react';
import { Button, Chip, Popover, Stack, TextField } from '@mui/material';
import { dateIcon } from './icons';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { format } from 'date-fns';
import { DueDate } from '../types/all';
import { isPastDate, toDueDate, toNormalDate } from './common';

interface Props {
    dueDate?: DueDate;
    onClick(dueDate?: DueDate): void;
}

function DateSelector({ dueDate, onClick }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [date, setDate] = React.useState<Date | null>(dueDate ? toNormalDate(dueDate) : null);

    return (
        <div>
            <Chip
                label={(date && format(date, "EEE MMM dd")) || "..."}
                color={date && isPastDate(date) ? "error" : "default"}
                variant="outlined"
                size="small"
                icon={dateIcon()}
                onClick={event => setAnchorEl(event.currentTarget)}
            />
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
