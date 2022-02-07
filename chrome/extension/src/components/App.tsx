import React from 'react';
import { getGreeting } from '../utils/common';
import TasksContainer from './TasksContainer';
import ProjectsContainer from './ProjectsContainer';
import TagsContainer from './TagsContainer';
import { Items } from '../types/all';
import { getAllItems } from '../dao/itemDao';
import { Divider, Typography } from '@mui/material';

function App() {
    const [items, setItems] = React.useState<Items>({
        tasks: [],
        projects: [],
        tags: []
    });

    const updateAllItems = () => getAllItems(items => setItems(items));
    React.useEffect(updateAllItems, []);

    return (
        <div>
            <Typography className="greeting">{getGreeting()}</Typography>

            <Divider className="divider">Tasks</Divider>
            <TasksContainer items={items} onChange={updateAllItems} />

            <Divider className="divider">Projects</Divider>
            <ProjectsContainer items={items} onChange={updateAllItems} />

            <Divider className="divider">Tags</Divider>
            <TagsContainer items={items} onChange={updateAllItems} />
        </div>
    );
}

export default App;
