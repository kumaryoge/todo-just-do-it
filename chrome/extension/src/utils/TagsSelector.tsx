import React from 'react';
import { Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, Popover, Stack, Tooltip, Typography } from '@mui/material';
import { tagIcon } from './icons';
import { Tag } from '../types/all';
import { getCurrentTags } from '../dao/itemDao';
import { shallowEquals, TOOLTIP_ENTER_DELAY, TOOLTIP_LEAVE_DELAY, truncate } from './common';

interface Props {
    completed?: boolean;
    tagIds?: number[];
    onClick(tagIds?: number[]): void;
}

function getTagsByIds(tagIds: number[]): Tag[] {
    const tags: Tag[] = [];
    for (const tag of getCurrentTags()) {
        if (tagIds.includes(tag.id)) {
            tags.push(tag);
        }
    }
    return tags;
}

function TagsSelector({ completed, tagIds, onClick }: Props) {
    const savedTags = tagIds ? getTagsByIds(tagIds) : [];

    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [tags, setTags] = React.useState<Tag[]>(savedTags);

    return (
        <div>
            <Tooltip
                title={<Typography>{savedTags.map(tag => tag.name).join(", ") || "Add one or more tags to this task"}</Typography>}
                enterDelay={TOOLTIP_ENTER_DELAY}
                leaveDelay={TOOLTIP_LEAVE_DELAY}
            >
                <Chip
                    label={<Typography fontSize="small">{truncate(savedTags.map(tag => tag.name).join()) || "+"}</Typography>}
                    variant="outlined"
                    size="small"
                    icon={tagIcon()}
                    onClick={event => setAnchorEl(event.currentTarget)}
                    sx={completed ? { color: "gray" } : {}}
                />
            </Tooltip>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                    setAnchorEl(null);
                    setTags(savedTags);
                }}
            >
                <FormControl sx={{ p: 2 }}>
                    <FormLabel>Tags</FormLabel>
                    <FormGroup>
                        {getCurrentTags().map(tag =>
                            <FormControlLabel label={tag.name} control={
                                <Checkbox
                                    checked={tags.map(t => t.id).includes(tag.id)}
                                    onChange={(event) => {
                                        let newTags = tags.filter(t => t.id !== tag.id);
                                        if (event.target.checked) {
                                            newTags = newTags.concat(tag);
                                        }
                                        setTags(newTags);
                                    }}
                                />
                            } />
                        )}
                        {getCurrentTags().length === 0 &&
                            <Typography color="gray" pt={2}>No tags available! Please add a tag in the Tags list first.</Typography>
                        }
                    </FormGroup>
                </FormControl>
                <Stack direction="row">
                    <Button
                        fullWidth={true}
                        onClick={() => setTags([])}
                        disabled={tags.length === 0}
                    >
                        Reset
                    </Button>
                    <Button
                        fullWidth={true}
                        onClick={() => {
                            setAnchorEl(null);
                            onClick(tags.map(t => t.id));
                        }}
                        disabled={shallowEquals(tags.map(t => t.id).sort(), savedTags.map(t => t.id).sort())}
                    >
                        Save
                    </Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default TagsSelector;
