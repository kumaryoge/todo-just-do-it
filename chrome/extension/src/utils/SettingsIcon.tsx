import React from 'react';
import { SettingsOutlined } from '@mui/icons-material';
import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, Popover, Stack, Switch } from '@mui/material';
import { updateSettings } from '../dao/itemDao';
import { Settings } from '../types/all';
import { DEFAULT_SETTINGS, shallowEquals } from './common';

interface Props {
    classes: string;
    showBadge: boolean;
    autoExpandTodayList: boolean;
    autoCollapseLists: boolean;
    hideProjects: boolean;
    hideTags: boolean;
    onClick(): void;
}

function SettingsIcon({ classes, showBadge, autoExpandTodayList, autoCollapseLists, hideProjects, hideTags, onClick }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const settings: Settings = {
        showBadge: showBadge,
        autoExpandTodayList: autoExpandTodayList,
        autoCollapseLists: autoCollapseLists,
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
                                    checked={autoExpandTodayList}
                                    onChange={(event) => {
                                        setAnchorEl(null);
                                        updateSettings(
                                            { ...settings, autoExpandTodayList: event.target.checked },
                                            onClick);
                                    }}
                                />
                            }
                            label="Auto expand 'Today' task list at start"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={autoCollapseLists}
                                    onChange={(event) => {
                                        setAnchorEl(null);
                                        updateSettings(
                                            { ...settings, autoCollapseLists: event.target.checked },
                                            onClick);
                                    }}
                                />
                            }
                            label="Auto collapse lists to keep at most one list expanded at a time"
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
                        disabled={shallowEquals(settings, DEFAULT_SETTINGS)}
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
