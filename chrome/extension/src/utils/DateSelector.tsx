import React from 'react';
import { Button, Chip, MenuItem, Popover, Select, Stack, Switch, TextField, Tooltip, Typography } from '@mui/material';
import { dateIcon, dateRepeatIcon } from './icons';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DueDate, Frequency } from '../types/all';
import { getDateChipLabel, getDateTooltipTitle, isPastDate, shallowEquals, toDueDate, toNormalDate, TOOLTIP_ENTER_DELAY, TOOLTIP_LEAVE_DELAY } from './common';

interface Props {
    completed?: boolean;
    dueDate?: DueDate;
    onClick(dueDate?: DueDate): void;
}

function DateSelector({ completed, dueDate, onClick }: Props) {
    const savedDate = dueDate ? toNormalDate(dueDate) : null;
    const savedRepeat = dueDate?.repeat;

    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [date, setDate] = React.useState<Date | null>(savedDate);
    const [repeat, setRepeat] = React.useState(savedRepeat);

    return (
        <div>
            <Tooltip
                title={<Typography>{getDateTooltipTitle(savedDate, savedRepeat)}</Typography>}
                enterDelay={TOOLTIP_ENTER_DELAY}
                leaveDelay={TOOLTIP_LEAVE_DELAY}
            >
                <Chip
                    label={<Typography fontSize="small">{getDateChipLabel(savedDate)}</Typography>}
                    color={!completed && savedDate && isPastDate(savedDate) ? "error" : "default"}
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
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.5}
                        pb={2}
                        pl={2}
                    >
                        <Switch
                            checked={Boolean(repeat)}
                            onChange={(event) => {
                                if (event.target.checked) {
                                    setRepeat({
                                        frequency: repeat?.frequency || "day",
                                        interval: repeat?.interval || 1
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
                                    setRepeat({ ...repeat, frequency: freq });
                                }}
                            >
                                {["day", "week", "month", "year"].map(freq =>
                                    <MenuItem value={freq}>{repeat.interval > 1 ? `${freq}s` : freq}</MenuItem>
                                )}
                            </Select>
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
