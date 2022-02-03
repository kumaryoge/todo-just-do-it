import React from 'react';
import { Task } from '../types/all';
import { icon } from '../utils/icons';
import TaskContainer from './TaskContainer';

interface Props {
    type: "today" | "tomorrow" | "upcoming" | "unscheduled" | "completed" | "project" | "tag";
    name: string;
    tasks: Task[];
    onChange(): void;
}

function Accordion({ type, name, tasks, onChange }: Props) {
    const [isOpen, setOpen] = React.useState(false);

    return (
        <div>
            <button
                className={type + " accordion " + (isOpen ? "is-open" : "")}
                onClick={() => setOpen(!isOpen)}
            >
                {type === "project" ? icon("project") : (type === "tag" ? icon("tag") : icon("smartList"))}
                {name + " (" + tasks.length + ")"}
            </button>
            <div
                className={"accordion-content " + (!isOpen ? "is-closed" : "")}
            >
                {tasks.length === 0
                    ? <p className="empty-list">No tasks available!</p>
                    : tasks.map(task => (
                        <TaskContainer
                            key={task.id}
                            task={task}
                            onChange={onChange}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Accordion;
