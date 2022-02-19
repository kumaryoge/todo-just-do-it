import React from 'react';
import { SettingsOutlined } from '@mui/icons-material';
import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, Popover, Stack, Switch } from '@mui/material';
import { updateSettings } from '../dao/itemDao';
import { Settings } from '../types/all';
import { DEFAULT_SETTINGS } from './common';

interface Props {
    classes: string;
    showBadge: boolean;
    expandTodayList: boolean;
    dontAutoCollapse: boolean;
    hideProjects: boolean;
    hideTags: boolean;
    onClick(): void;
}

function SettingsIcon({ classes, showBadge, expandTodayList, dontAutoCollapse, hideProjects, hideTags, onClick }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const settings: Settings = {
        showBadge: showBadge,
        expandTodayList: expandTodayList,
        dontAutoCollapse: dontAutoCollapse,
        hideProjects: hideProjects,
        hideTags: hideTags
    };

    return (
        <div>
            <SettingsOutlined
                className={classes}
                fontSize="small"
                onClick={event => setAnchorEl(event.currentTarget)}
            />
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                <FormControl sx={{ p: 2 }}>
                    <FormLabel sx={{ pb: 1 }}>Settings</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showBadge}
                                    onChange={(event) => {
                                        setAnchorEl(null);
                                        updateSettings(
                                            { ...settings, showBadge: event.target.checked },
                                            onClick);
                                    }}
                                />
                            }
                            label="Show badge (number of tasks for today) on extension icon"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={expandTodayList}
                                    onChange={(event) => {
                                        setAnchorEl(null);
                                        updateSettings(
                                            { ...settings, expandTodayList: event.target.checked },
                                            onClick);
                                    }}
                                />
                            }
                            label="Expand 'Today' task list at start"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={dontAutoCollapse}
                                    onChange={(event) => {
                                        setAnchorEl(null);
                                        updateSettings(
                                            { ...settings, dontAutoCollapse: event.target.checked },
                                            onClick);
                                    }}
                                />
                            }
                            label="Don't auto collapse lists when a new list is opened"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={hideProjects}
                                    onChange={(event) => {
                                        setAnchorEl(null);
                                        updateSettings(
                                            { ...settings, hideProjects: event.target.checked },
                                            onClick);
                                    }}
                                />
                            }
                            label="Hide projects"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={hideTags}
                                    onChange={(event) => {
                                        setAnchorEl(null);
                                        updateSettings(
                                            { ...settings, hideTags: event.target.checked },
                                            onClick);
                                    }}
                                />
                            }
                            label="Hide tags"
                        />
                    </FormGroup>
                </FormControl>
                <Stack direction="row">
                    <Button
                        fullWidth={true}
                        onClick={() => {
                            setAnchorEl(null);
                            updateSettings(DEFAULT_SETTINGS, onClick);
                        }}
                        disabled={!(showBadge || expandTodayList || dontAutoCollapse || hideProjects || hideTags)}
                    >
                        Reset All
                    </Button>
                    <Button
                        fullWidth={true}
                        onClick={() => setAnchorEl(null)}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default SettingsIcon;
