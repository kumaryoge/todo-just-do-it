import React from 'react';
import { Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, Popover, Stack, Typography } from '@mui/material';
import { tagIcon } from './icons';
import { Tag } from '../types/all';
import { getCurrentTags } from '../dao/itemDao';
import { truncate } from './common';

interface Props {
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

function TagsSelector({ tagIds, onClick }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [tags, setTags] = React.useState<Tag[]>(tagIds ? getTagsByIds(tagIds) : []);

    return (
        <div>
            <Chip
                label={truncate(tags.map(tag => tag.name).join())}
                variant="outlined"
                size="small"
                icon={tagIcon()}
                onClick={event => setAnchorEl(event.currentTarget)}
            />
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                <FormControl sx={{ p: 2 }}>
                    <FormLabel>Tags</FormLabel>
                    <FormGroup>
                        {getCurrentTags().map(tag =>
                            <FormControlLabel label={tag.name} control={
                                <Checkbox
                                    checked={tags.map(t => t.id).includes(tag.id)}
                                    onChange={(event) => {
                                        setAnchorEl(null);
                                        let newTags = tags.filter(t => t.id != tag.id);
                                        if (event.target.checked) {
                                            newTags = newTags.concat(tag);
                                        }
                                        setTags(newTags);
                                        onClick(newTags.map(t => t.id));
                                    }}
                                />
                            } />
                        )}
                        {getCurrentTags().length === 0 &&
                            <Typography fontSize="small" color="gray" pt={2}>No tags available!</Typography>
                        }
                    </FormGroup>
                </FormControl>
                <Stack direction="row">
                    <Button fullWidth={true} onClick={() => {
                        setAnchorEl(null);
                        setTags([]);
                        onClick(undefined);
                    }} disabled={tags.length === 0}>Clear</Button>
                    <Button fullWidth={true} onClick={() => setAnchorEl(null)}>Cancel</Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default TagsSelector;
