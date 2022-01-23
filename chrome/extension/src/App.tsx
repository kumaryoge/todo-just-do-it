import React from 'react';
import { getGreeting } from './util';
import TasksContainer from './components/TasksContainer';
import ProjectsContainer from './components/ProjectsContainer';
import TagsContainer from './components/TagsContainer';

function App() {
  return (
    <div>
      <p id="greeting">{getGreeting()}</p>

      <div className="separator">Tasks</div>
      <TasksContainer />

      <div className="separator">Projects</div>
      <ProjectsContainer />

      <div className="separator">Tags</div>
      <TagsContainer />
    </div>
  );
}

export default App;
