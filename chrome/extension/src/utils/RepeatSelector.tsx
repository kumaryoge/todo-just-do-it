import React from 'react';
import { IconButton, MenuItem, Select, Stack, Switch, Typography } from '@mui/material';
import { Frequency, RepeatPattern } from '../types/all';
import { getDefaultWeekDays, getWeekDays, isBitSet, toggleBit } from './common';

interface Props {
    date: Date;
    repeat: RepeatPattern | undefined;
    onChange(newRepeat: RepeatPattern | undefined): void;
}

function RepeatSelector({ date, repeat, onChange }: Props) {
    return (
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
                            onChange({
                                frequency: "day",
                                interval: 1
                            });
                        } else {
                            onChange(undefined);
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
                            onChange({ ...repeat, interval: Number(event.target.value) });
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
                            delete repeat.weekDays;
                            onChange({ ...repeat, frequency: freq });
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
                                    delete repeat.weekDays;
                                    onChange({ ...repeat });
                                } else {
                                    onChange({ ...repeat, weekDays: weekDays });
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
            {repeat &&
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                >
                    <Switch
                        checked={Boolean(repeat.endAfter)}
                        onChange={(event) => {
                            if (event.target.checked) {
                                onChange({ ...repeat, endAfter: 1 });
                            } else {
                                delete repeat.endAfter;
                                onChange({ ...repeat });
                            }
                        }}
                    />
                    <Typography>{repeat.endAfter ? "End after" : "End"}</Typography>
                    {repeat.endAfter &&
                        <Select
                            value={repeat.endAfter}
                            variant="standard"
                            autoWidth={true}
                            disableUnderline={true}
                            onChange={(event) => {
                                onChange({ ...repeat, endAfter: Number(event.target.value) });
                            }}
                        >
                            {Array.from(Array(99).keys()).map(i =>
                                <MenuItem value={i + 1}>{i + 1}</MenuItem>
                            )}
                        </Select>
                    }
                    {repeat.endAfter &&
                        <Typography>{repeat.endAfter > 1 ? "repetitions" : "repetition"}</Typography>
                    }
                </Stack>
            }
        </Stack>
    );
}

export default RepeatSelector;
