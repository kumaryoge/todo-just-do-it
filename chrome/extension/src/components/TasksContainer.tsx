import React from 'react';
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
    onChange(): void;
}

function TasksContainer({ items, onChange }: Props) {
    return (
        <div>
            <TasksAccordion
                type="today"
                name="Today"
                tasks={filterTodaysTasks(items.tasks)}
                onChange={onChange}
            />
            <TasksAccordion
                type="tomorrow"
                name="Tomorrow"
                tasks={filterTomorrowsTasks(items.tasks)}
                onChange={onChange}
            />
            <TasksAccordion
                type="upcoming"
                name="Upcoming"
                tasks={filterUpcomingTasks(items.tasks)}
                onChange={onChange}
            />
            <TasksAccordion
                type="unscheduled"
                name="Unscheduled"
                tasks={filterUnscheduledTasks(items.tasks)}
                onChange={onChange}
            />
            <TasksAccordion
                type="completed"
                name="Completed"
                tasks={filterCompletedTasks(items.tasks)}
                onChange={onChange}
            />
            {items.projects.map(project => (
                <TasksAccordion
                    key={project.id}
                    type="project"
                    name={project.name}
                    tasks={items.tasks.filter(task => task.projectId === project.id)}
                    onChange={onChange}
                />
            ))}
            {items.tags.map(tag => (
                <TasksAccordion
                    key={tag.id}
                    type="tag"
                    name={tag.name}
                    tasks={items.tasks.filter(task => task.tagIds && task.tagIds.includes(tag.id))}
                    onChange={onChange}
                />
            ))}
        </div>
    );
}

export default TasksContainer;
