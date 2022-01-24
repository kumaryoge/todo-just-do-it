import React from 'react';
import { Project, Tag, Task } from '../types/all';

interface Props {
    task: Task;
    allProjects: Project[];
    allTags: Tag[];
}

function TaskContainer({ task, allProjects, allTags }: Props) {
    return (
        <div className="task-input-container">
            <input type="text" placeholder={task.name} disabled />
            <i className="fa fa-edit"></i>
            <i className="fa fa-trash"></i>
        </div>
    );
}

export default TaskContainer;
