import React from 'react';
import Accordion from './Accordion';
import { Items } from '../types/all';
import {
    filterTodaysTasks,
    filterTomorrowsTasks,
    filterUpcomingTasks,
    filterUnscheduledTasks,
    filterCompletedTasks
} from '../utils/common';
import TaskContainer from './TaskContainer';

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
            <TaskContainer onChange={onChange} />
        </div>
    );
}

export default TasksContainer;
