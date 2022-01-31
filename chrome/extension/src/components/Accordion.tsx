import React from 'react';
import { Item, Items, Task } from '../types/all';
import { icon } from '../utils/icons';
import ProjectContainer from './ProjectContainer';
import TagContainer from './TagContainer';
import TaskContainer from './TaskContainer';

interface Props {
    type: "today" | "tomorrow" | "upcoming" | "unscheduled" | "completed" | "project" | "tag";
    name: string;
    items: Items;
    taskFilter(tasks: Task[]): Task[];
    onChange(): void;
    item?: Item
}

function Accordion({ type, name, items, taskFilter, onChange, item }: Props) {
    const [isOpen, setOpen] = React.useState(false);

    return (
        <div>
            <button
                className={type + " accordion " + (isOpen ? "is-open" : "")}
                onClick={() => setOpen(!isOpen)}
            >
                {type === "project" ? icon("project") : (type === "tag" ? icon("tag") : icon("smartList"))}
                {name + " (" + taskFilter(items.tasks).length + ")"}
            </button>
            <div
                className={"accordion-content " + (!isOpen ? "is-closed" : "")}
            >
                {item && type === "project" && <ProjectContainer project={item} onChange={onChange} />}
                {item && type === "tag" && <TagContainer tag={item} onChange={onChange} />}
                {taskFilter(items.tasks).length === 0
                    ? <p className="empty-list">No tasks available!</p>
                    : taskFilter(items.tasks).map(task => (
                        <TaskContainer
                            key={task.id}
                            task={task}
                            allProjects={items.projects}
                            allTags={items.tags}
                            onChange={onChange}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Accordion;
