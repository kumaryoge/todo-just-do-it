import React from 'react';
import { DEFAULT_SETTINGS, filterTodaysTasks, getGreeting } from '../utils/common';
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
        tags: [],
        settings: DEFAULT_SETTINGS
    });
    const [expandStatus, setExpandStatus] = React.useState<{ [key: string]: boolean; }>({});

    const updateExpandStatus = (key: string, value: boolean) => {
        if (items.settings.autoCollapseLists) {
            setExpandStatus({ [key]: value });
        } else {
            setExpandStatus({ ...expandStatus, [key]: value });
        }
    };
    const updateAllItems = () => getAllItems(items => {
        setItems(items);
        if (Object.keys(expandStatus).length === 0) {
            setExpandStatus({ today: items.settings.autoExpandTodayList });
        }
        if (items.settings.showBadge) {
            const numTasksToday = filterTodaysTasks(items.tasks).length;
            const strTasksToday = numTasksToday + ` ${numTasksToday > 1 ? "tasks" : "task"} today`;
            chrome.action.setTitle({ title: `Todo: ${numTasksToday ? strTasksToday : "Just do it"}!` });
            chrome.action.setBadgeText({ text: `${numTasksToday ? numTasksToday : ""}` });
            chrome.action.setBadgeBackgroundColor({ color: "#f00e0e" });
        } else {
            chrome.action.setTitle({ title: "Todo: Just do it!" });
            chrome.action.setBadgeText({ text: "" });
        }
    });
    React.useEffect(updateAllItems, []);

    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between" pt={0.5} pl={2} pr={2}>
                {homeIcon(() => window.location.href = "index.html")}
                <Typography color="gray">{getGreeting()}</Typography>
                {settingsIcon(
                    items.settings.showBadge,
                    items.settings.autoExpandTodayList,
                    items.settings.autoCollapseLists,
                    items.settings.hideProjects,
                    items.settings.hideTags,
                    updateAllItems
                )}
            </Stack>

            <Divider className="divider">Tasks</Divider>
            <TasksContainer
                items={items}
                onChange={updateAllItems}
                expandStatus={expandStatus}
                updateExpandStatus={(key, value) => updateExpandStatus(key, value)}
            />

            {!items.settings.hideProjects && <Divider className="divider">Projects</Divider>}
            {!items.settings.hideProjects &&
                <ProjectsContainer
                    items={items}
                    onChange={updateAllItems}
                    expand={expandStatus.projects}
                    onExpand={(expanded) => updateExpandStatus("projects", expanded)}
                />
            }

            {!items.settings.hideTags && <Divider className="divider">Tags</Divider>}
            {!items.settings.hideTags &&
                <TagsContainer
                    items={items}
                    onChange={updateAllItems}
                    expand={expandStatus.tags}
                    onExpand={(expanded) => updateExpandStatus("tags", expanded)}
                />
            }
        </div>
    );
}

export default App;
