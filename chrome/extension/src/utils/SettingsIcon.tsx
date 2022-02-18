import React from 'react';
import { SettingsOutlined } from '@mui/icons-material';
import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, Popover, Stack, Switch } from '@mui/material';
import { updateSettings } from '../dao/itemDao';

interface Props {
    classes: string;
    showBadge: boolean;
    hideProjects: boolean;
    hideTags: boolean;
    onClick(): void;
}

function SettingsIcon({ classes, showBadge, hideProjects, hideTags, onClick }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<any>(null);

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
                                        updateSettings({
                                            showBadge: event.target.checked,
                                            hideProjects: hideProjects,
                                            hideTags: hideTags
                                        }, onClick);
                                    }}
                                />
                            }
                            label="Show badge (number of tasks for today) on extension icon"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={hideProjects}
                                    onChange={(event) => {
                                        setAnchorEl(null);
                                        updateSettings({
                                            showBadge: showBadge,
                                            hideProjects: event.target.checked,
                                            hideTags: hideTags
                                        }, onClick);
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
                                        updateSettings({
                                            showBadge: showBadge,
                                            hideProjects: hideProjects,
                                            hideTags: event.target.checked
                                        }, onClick);
                                    }}
                                />
                            }
                            label="Hide tags"
                        />
                    </FormGroup>
                </FormControl>
                <Stack direction="row">
                    <Button fullWidth={true} onClick={() => {
                        setAnchorEl(null);
                        updateSettings({
                            showBadge: false,
                            hideProjects: false,
                            hideTags: false
                        }, onClick);
                    }} disabled={!(showBadge || hideProjects || hideTags)}>Reset All</Button>
                    <Button fullWidth={true} onClick={() => setAnchorEl(null)}>Cancel</Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default SettingsIcon;
