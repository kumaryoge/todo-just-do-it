import React from 'react';
import { Button, Chip, IconButton, MenuItem, Popover, Select, Stack, Switch, TextField, Tooltip, Typography } from '@mui/material';
import { dateIcon, dateRepeatIcon } from './icons';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DueDate, Frequency, RepeatPattern } from '../types/all';
import { getDateChipLabel, getDateTooltipTitle, getDefaultWeekDays, getWeekDays, isBitSet, isPastDate, shallowEquals, toDueDate, toggleBit, toNormalDate, TOOLTIP_ENTER_DELAY, TOOLTIP_LEAVE_DELAY } from './common';

interface Props {
    completed?: boolean;
    dueDate?: DueDate;
    onClick(dueDate?: DueDate): void;
}

function DateSelector({ completed, dueDate, onClick }: Props) {
    const savedDate = dueDate ? toNormalDate(dueDate) : null;
    const savedRepeat = dueDate?.repeat && (
        dueDate.repeat.weekDays
            ? {
                frequency: dueDate.repeat.frequency,
                interval: dueDate.repeat.interval,
                weekDays: dueDate.repeat.weekDays
            }
            : {
                frequency: dueDate.repeat.frequency,
                interval: dueDate.repeat.interval
            }
    );

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
                    <Stack pb={2} pl={2} pr={2}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                        >
                            <Switch
                                checked={Boolean(repeat)}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        setRepeat({
                                            frequency: "day",
                                            interval: 1
                                        });
                                    } else {
                                        setRepeat(undefined);
                                    }
                                }}
                            />
                            <Typography>{repeat ? "Repeat every" : "Repeat"}</Typography>
                            {repeat &&
                                <Select
                                    value={repeat.interval}
                                    variant="standard"
                                    autoWidth={true}
                                    disableUnderline={true}
                                    onChange={(event) => {
                                        setRepeat({ ...repeat, interval: Number(event.target.value) });
                                    }}
                                >
                                    {Array.from(Array(99).keys()).map(i =>
                                        <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                    )}
                                </Select>
                            }
                            {repeat &&
                                <Select
                                    value={repeat.frequency}
                                    variant="standard"
                                    autoWidth={true}
                                    disableUnderline={true}
                                    onChange={(event) => {
                                        let freq: Frequency = "day";
                                        switch (event.target.value) {
                                            case "week":
                                                freq = "week";
                                                break;
                                            case "month":
                                                freq = "month";
                                                break;
                                            case "year":
                                                freq = "year";
                                                break;
                                        }
                                        setRepeat({ frequency: freq, interval: repeat.interval });
                                    }}
                                >
                                    {["day", "week", "month", "year"].map(freq =>
                                        <MenuItem value={freq}>{repeat.interval > 1 ? `${freq}s` : freq}</MenuItem>
                                    )}
                                </Select>
                            }
                        </Stack>
                        {repeat?.frequency === "week" &&
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography>on</Typography>
                                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) =>
                                    <IconButton
                                        size="small"
                                        color={isBitSet(getWeekDays(date, repeat.weekDays), i) ? "primary" : "default"}
                                        onClick={() => {
                                            const weekDays = toggleBit(getWeekDays(date, repeat.weekDays), i);
                                            if (weekDays === 0 || weekDays === getDefaultWeekDays(date)) {
                                                setRepeat({ frequency: repeat.frequency, interval: repeat.interval });
                                            } else {
                                                setRepeat({ ...repeat, weekDays: weekDays });
                                            }
                                        }}
                                    >
                                        <Typography
                                            fontWeight={isBitSet(getWeekDays(date, repeat.weekDays), i) ? "bold" : "normal"}
                                        >
                                            {day}
                                        </Typography>
                                    </IconButton>
                                )}
                            </Stack>
                        }
                    </Stack>
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
                            onClick(date ? toDueDate(date, repeat) : undefined);
                        }}
                        disabled={date?.getTime() === savedDate?.getTime() && shallowEquals(repeat, savedRepeat)}
                    >
                        Save
                    </Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default DateSelector;
