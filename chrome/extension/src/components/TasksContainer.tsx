import React from 'react';
import ItemInput from './ItemInput';
import TasksAccordion from './TasksAccordion';
import { Items } from '../types/all';
import {
    filterTodaysTasks,
    filterTomorrowsTasks,
    filterUpcomingTasks,
    filterUnscheduledTasks,
    filterCompletedTasks
} from '../utils/common';

interface Props {
    items: Items;
}

function TasksContainer({ items }: Props) {
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
            <div className="task-container">
                <ItemInput type="task" />
                <i className="fa fa-calendar"></i>
                <i className="fa fa-list"></i>
                <i className="fa fa-tags"></i>
            </div>
        </div>
    );
}

export default TasksContainer;
