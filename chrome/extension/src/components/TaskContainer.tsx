import React from 'react';
import { Project, Tag, Task } from '../types/all';

interface Props {
    task: Task;
    allProjects: Project[];
    allTags: Tag[];
}

function TaskContainer({ task, allProjects, allTags }: Props) {
    return (
        <div className="task-container">
            <input
                className={task.completed ? "is-completed" : ""}
                type="text"
                value={task.name}
                readOnly={true}
            />
            <i className="fa fa-edit"></i>
        </div>
    );
}

export default TaskContainer;
