import React from 'react';
import { Items } from '../types/all';
import { taskListIcon } from '../utils/icons';
import TagContainer from './TagContainer';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';

interface Props {
    items: Items;
    onChange(): void;
    expand: boolean;
    onExpand(expanded: boolean): void;
}

function TagsContainer({ items, onChange, expand, onExpand }: Props) {
    const [isExpanded, setExpanded] = React.useState(false);
    React.useEffect(() => setExpanded(expand), [expand]);

    return (
        <Accordion
            expanded={isExpanded}
            onChange={(event, newExpanded) => onExpand(newExpanded)}
        >
            <AccordionSummary
                expandIcon={<ExpandMore className="tag" />}
            >
                <Stack
                    className="tag"
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    {taskListIcon("tag")}
                    <Typography>{"Tags (" + items.tags.length + ")"}</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    {items.tags.map(tag => (
                        <TagContainer
                            key={tag.id}
                            tag={tag}
                            onChange={onChange}
                        />
                    ))}
                    <TagContainer onChange={onChange} />
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default TagsContainer;
