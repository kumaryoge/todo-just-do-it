import React from 'react';
import { Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, Popover, Stack } from '@mui/material';
import { tagIcon } from './icons';
import { Tag } from '../types/all';
import { currentItems } from '../dao/itemDao';

interface Props {
    tagIds?: number[];
    onClick(tagIds?: number[]): void;
}

function getTagsByIds(tagIds: number[]): Tag[] {
    const tags: Tag[] = [];
    for (const tag of currentItems.tags) {
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
                label={tags.map(tag => tag.name).join() || "..."}
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
                        {currentItems.tags.map(tag =>
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
                    </FormGroup>
                </FormControl>
                <Stack direction="row">
                    <Button fullWidth={true} onClick={() => {
                        setAnchorEl(null);
                        setTags([]);
                        onClick(undefined);
                    }}>Clear</Button>
                    <Button fullWidth={true} onClick={() => setAnchorEl(null)}>Cancel</Button>
                </Stack>
            </Popover>
        </div>
    );
}

export default TagsSelector;
