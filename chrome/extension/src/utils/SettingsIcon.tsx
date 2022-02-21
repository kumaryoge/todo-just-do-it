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
    const savedSettings: Settings = {
        showBadge: showBadge,
        autoExpandTodayList: autoExpandTodayList,
        autoCollapseLists: autoCollapseLists,
        hideProjects: hideProjects,
        hideTags: hideTags
    };

    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [settings, setSettings] = React.useState(savedSettings);
    React.useEffect(() => setSettings(savedSettings), [showBadge, autoExpandTodayList, autoCollapseLists, hideProjects, hideTags]);

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
                onClose={() => {
                    setAnchorEl(null);
                    setSettings(savedSettings);
                }}
            >
                <FormControl sx={{ p: 2 }}>
                    <FormLabel sx={{ pb: 1 }}>Settings</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.showBadge}
                                    onChange={(event) => {
                                        setSettings({ ...settings, showBadge: event.target.checked });
                                    }}
                                />
                            }
                            label="Show badge (number of tasks for today) on extension icon"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.autoExpandTodayList}
                                    onChange={(event) => {
                                        setSettings({ ...settings, autoExpandTodayList: event.target.checked });
                                    }}
                                />
                            }
                            label="Auto expand 'Today' task list at start"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.autoCollapseLists}
                                    onChange={(event) => {
                                        setSettings({ ...settings, autoCollapseLists: event.target.checked });
                                    }}
                                />
                            }
                            label="Auto collapse lists to keep at most one list expanded at a time"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.hideProjects}
                                    onChange={(event) => {
                                        setSettings({ ...settings, hideProjects: event.target.checked });
                                    }}
                                />
                            }
                            label="Hide projects"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.hideTags}
                                    onChange={(event) => {
                                        setSettings({ ...settings, hideTags: event.target.checked });
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
                        onClick={() => setSettings(DEFAULT_SETTINGS)}
                        disabled={shallowEquals(settings, DEFAULT_SETTINGS)}
                    >
                        Reset
                    </Button>
                    <Button
                        fullWidth={true}
                        onClick={() => {
                            setAnchorEl(null);
                            updateSettings(settings, onClick);
                        }}
                        disabled={shallowEquals(settings, savedSettings)}
                    >
                        Save
                    </Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default SettingsIcon;
