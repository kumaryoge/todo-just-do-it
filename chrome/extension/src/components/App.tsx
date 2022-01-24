import React from 'react';
import { getGreeting } from '../utils/common';
import TasksContainer from './TasksContainer';
import ProjectsContainer from './ProjectsContainer';
import TagsContainer from './TagsContainer';
import { Items } from '../types/all';
import { getAllItems } from '../dao/itemDao';

function App() {
    const [items, setItems] = React.useState<Items>({
        tasks: [],
        projects: [],
        tags: []
    });

    React.useEffect(() => {
        getAllItems(items => setItems(items));
    }, []);

    return (
        <div>
            <p id="greeting">{getGreeting()}</p>

            <div className="separator">Tasks</div>
            <TasksContainer
                items={items}
                onAddTask={task => {
                    setItems({
                        tasks: items.tasks.concat(task),
                        projects: items.projects,
                        tags: items.tags
                    });
                }}
            />

            <div className="separator">Projects</div>
            <ProjectsContainer
                items={items}
                onAddProject={project => {
                    setItems({
                        tasks: items.tasks,
                        projects: items.projects.concat(project),
                        tags: items.tags
                    });
                }}
            />

            <div className="separator">Tags</div>
            <TagsContainer
                items={items}
                onAddTag={tag => {
                    setItems({
                        tasks: items.tasks,
                        projects: items.projects,
                        tags: items.tags.concat(tag)
                    });
                }}
            />
        </div>
    );
}

export default App;
