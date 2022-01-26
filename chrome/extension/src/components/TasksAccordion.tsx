import React from 'react';
import { Items, Task } from '../types/all';
import { projectIcon, smartListIcon, tagIcon } from '../utils/icons';
import TaskContainer from './TaskContainer';

interface Props {
    type: "today" | "tomorrow" | "upcoming" | "unscheduled" | "completed" | "project" | "tag";
    name: string;
    items: Items;
    taskFilter(tasks: Task[]): Task[];
}

function TasksAccordion({ type, name, items, taskFilter }: Props) {
    const [isOpen, setOpen] = React.useState(false);

    return (
        <div>
            <button
                className={type + " accordion " + (isOpen ? "is-open" : "")}
                onClick={() => setOpen(!isOpen)}
            >
                {type === "project" ? projectIcon : (type === "tag" ? tagIcon : smartListIcon)}
                {name + " (" + taskFilter(items.tasks).length + ")"}
            </button>
            <div
                className={"accordion-content " + (!isOpen ? "is-closed" : "")}
            >
                {taskFilter(items.tasks).map(task => (
                    <TaskContainer key={task.id} task={task} allProjects={items.projects} allTags={items.tags} />
                ))}
            </div>
        </div>
    );
}

export default TasksAccordion;
