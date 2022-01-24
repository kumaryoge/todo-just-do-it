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
        getAllItems((items) => setItems(items));
    }, []);

    return (
        <div>
            <p id="greeting">{getGreeting()}</p>

            <div className="separator">Tasks</div>
            <TasksContainer items={items} />

            <div className="separator">Projects</div>
            <ProjectsContainer items={items} />

            <div className="separator">Tags</div>
            <TagsContainer items={items} />
        </div>
    );
}

export default App;
