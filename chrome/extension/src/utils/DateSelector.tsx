import React from 'react';
import { Button, Chip, Popover, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { dateIcon, dateRepeatIcon } from './icons';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DueDate, RepeatPattern } from '../types/all';
import {
    getDateChipLabel,
    getDateTooltipTitle,
    getDefaultWeekDays,
    isPastDate,
    shallowEquals,
    toDueDate,
    toNormalDate,
    TOOLTIP_ENTER_DELAY,
    TOOLTIP_LEAVE_DELAY
} from './common';
import RepeatSelector from './RepeatSelector';

interface Props {
    completed?: boolean;
    dueDate?: DueDate;
    onClick(dueDate?: DueDate): void;
}

function cloneRepeat(repeat: RepeatPattern): RepeatPattern {
    const clone: RepeatPattern = {
        frequency: repeat.frequency,
        interval: repeat.interval
    };
    if (repeat.weekDays) {
        clone.weekDays = repeat.weekDays;
    }
    if (repeat.endAfter) {
        clone.endAfter = repeat.endAfter;
    }
    return clone;
}

function updateRepeat(repeat: RepeatPattern | undefined, date: Date | null): RepeatPattern | undefined {
    if (date && repeat && (repeat.weekDays === 0 || repeat.weekDays === getDefaultWeekDays(date))) {
        delete repeat.weekDays;
    }
    return repeat;
}

function DateSelector({ completed, dueDate, onClick }: Props) {
    const savedDate = dueDate ? toNormalDate(dueDate) : null;
    const savedRepeat = dueDate?.repeat && cloneRepeat(dueDate.repeat);

    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [date, setDate] = React.useState<Date | null>(savedDate);
    const [repeat, setRepeat] = React.useState<RepeatPattern | undefined>(savedRepeat);

    return (
        <div>
            <Tooltip
                title={<Typography whiteSpace="pre-line">{getDateTooltipTitle(savedDate, savedRepeat)}</Typography>}
                enterDelay={TOOLTIP_ENTER_DELAY}
                leaveDelay={TOOLTIP_LEAVE_DELAY}
            >
                <Chip
                    label={<Typography fontSize="small">{getDateChipLabel(savedDate)}</Typography>}
                    color={!completed && isPastDate(savedDate) ? "error" : "default"}
                    variant="outlined"
                    size="small"
                    icon={savedRepeat ? dateRepeatIcon() : dateIcon()}
                    onClick={event => setAnchorEl(event.currentTarget)}
                    sx={completed ? { color: "gray" } : {}}
                />
            </Tooltip>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                    setAnchorEl(null);
                    setDate(savedDate);
                    setRepeat(savedRepeat);
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        value={date}
                        onChange={newDate => {
                            setDate(newDate);
                        }}
                        renderInput={params => <TextField {...params} />}
                    />
                </LocalizationProvider>
                {date &&
                    <RepeatSelector date={date} repeat={repeat} onChange={(newRepeat) => setRepeat(newRepeat)} />
                }
                <Stack direction="row">
                    <Button
                        fullWidth={true}
                        onClick={() => {
                            setDate(null);
                            setRepeat(undefined);
                        }}
                        disabled={date === null}
                    >
                        Reset
                    </Button>
                    <Button
                        fullWidth={true}
                        onClick={() => {
                            setAnchorEl(null);
                            onClick(date
                                ? toDueDate(date, updateRepeat(repeat, date))
                                : undefined);
                        }}
                        disabled={date?.getTime() === savedDate?.getTime()
                            && shallowEquals(updateRepeat(repeat, date), savedRepeat)}
                    >
                        Save
                    </Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default DateSelector;
