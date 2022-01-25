import React from 'react';
import ItemInput from './ItemInput';
import TasksAccordion from './TasksAccordion';
import { Items, Task } from '../types/all';
import {
    filterTodaysTasks,
    filterTomorrowsTasks,
    filterUpcomingTasks,
    filterUnscheduledTasks,
    filterCompletedTasks
} from '../utils/common';
import { addItem } from '../dao/itemDao';

interface Props {
    items: Items;
    onAddTask(task: Task): void;
}

function TasksContainer({ items, onAddTask }: Props) {
    return (
        <div>
            <div className="container">
                <TasksAccordion
                    type="today"
                    name="Today"
                    items={items}
                    taskFilter={filterTodaysTasks}
                />
                <TasksAccordion
                    type="tomorrow"
                    name="Tomorrow"
                    items={items}
                    taskFilter={filterTomorrowsTasks}
                />
                <TasksAccordion
                    type="upcoming"
                    name="Upcoming"
                    items={items}
                    taskFilter={filterUpcomingTasks}
                />
                <TasksAccordion
                    type="unscheduled"
                    name="Unscheduled"
                    items={items}
                    taskFilter={filterUnscheduledTasks}
                />
                <TasksAccordion
                    type="completed"
                    name="Completed"
                    items={items}
                    taskFilter={filterCompletedTasks}
                />
            </div>
            <div className="input-container">
                <ItemInput
                    type="task"
                    onAddItem={value => {
                        const task: Task = { id: 0, name: value };
                        addItem("tasks", task, () => onAddTask(task));
                    }}
                />
                <i className="fa fa-calendar"></i>
                <i className="fa fa-list"></i>
                <i className="fa fa-tags"></i>
            </div>
        </div>
    );
}

export default TasksContainer;
