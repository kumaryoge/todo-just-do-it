import React from 'react';
import { Project, Tag, Task } from '../types/all';
import { dateIcon, deleteIcon, projectIcon, tagsIcon, taskIcon } from '../utils/icons';

interface Props {
    task: Task;
    allProjects: Project[];
    allTags: Tag[];
}

function TaskContainer({ task, allProjects, allTags }: Props) {
    return (
        <div className="task-container">
            {taskIcon}
            <input
                className={task.completed ? "is-completed" : ""}
                type="text"
                value={task.name}
                readOnly={true}
            />
            {dateIcon}
            {projectIcon}
            {tagsIcon}
            {deleteIcon}
        </div>
    );
}

export default TaskContainer;
