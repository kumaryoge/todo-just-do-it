import React from 'react';
import ItemInput from './ItemInput';
import Accordion from './Accordion';
import { Items, Task } from '../types/all';
import {
    filterTodaysTasks,
    filterTomorrowsTasks,
    filterUpcomingTasks,
    filterUnscheduledTasks,
    filterCompletedTasks
} from '../utils/common';
import { addItem } from '../dao/itemDao';
import { icon } from '../utils/icons';

interface Props {
    items: Items;
    onChange(): void;
}

function TasksContainer({ items, onChange }: Props) {
    return (
        <div>
            <div className="container">
                <Accordion
                    type="today"
                    name="Today"
                    tasks={filterTodaysTasks(items.tasks)}
                    onChange={onChange}
                />
                <Accordion
                    type="tomorrow"
                    name="Tomorrow"
                    tasks={filterTomorrowsTasks(items.tasks)}
                    onChange={onChange}
                />
                <Accordion
                    type="upcoming"
                    name="Upcoming"
                    tasks={filterUpcomingTasks(items.tasks)}
                    onChange={onChange}
                />
                <Accordion
                    type="unscheduled"
                    name="Unscheduled"
                    tasks={filterUnscheduledTasks(items.tasks)}
                    onChange={onChange}
                />
                <Accordion
                    type="completed"
                    name="Completed"
                    tasks={filterCompletedTasks(items.tasks)}
                    onChange={onChange}
                />
            </div>
            <div className="item-container">
                {icon("add")}
                <ItemInput
                    type="task"
                    onAddItem={value => {
                        const task: Task = { id: 0, name: value };
                        addItem("tasks", task, onChange);
                    }}
                />
                {icon("date")}
                {icon("project")}
                {icon("tags")}
            </div>
        </div>
    );
}

export default TasksContainer;
