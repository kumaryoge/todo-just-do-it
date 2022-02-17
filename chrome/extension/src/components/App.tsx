import React from 'react';
import { filterTodaysTasks, getGreeting } from '../utils/common';
import TasksContainer from './TasksContainer';
import ProjectsContainer from './ProjectsContainer';
import TagsContainer from './TagsContainer';
import { Items } from '../types/all';
import { getAllItems } from '../dao/itemDao';
import { Divider, Stack, Typography } from '@mui/material';
import { homeIcon, settingsIcon } from '../utils/icons';

function App() {
    const [items, setItems] = React.useState<Items>({
        tasks: [],
        projects: [],
        tags: []
    });

    const updateAllItems = () => getAllItems(items => {
        setItems(items);
        const numTasksToday = filterTodaysTasks(items.tasks).length;
        const strTasksToday = numTasksToday + ` ${numTasksToday > 1 ? "tasks" : "task"} today`;
        chrome.action.setTitle({ title: `Todo: ${numTasksToday ? strTasksToday : "Just do it"}!` });
        chrome.action.setBadgeText({ text: `${numTasksToday ? numTasksToday : ""}` });
        chrome.action.setBadgeBackgroundColor({ color: "#f00e0e" });
    });
    React.useEffect(updateAllItems, []);

    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between" pt={0.5} pl={2} pr={2}>
                {homeIcon()}
                <Typography color="gray">{getGreeting()}</Typography>
                {settingsIcon(() => { })}
            </Stack>

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
