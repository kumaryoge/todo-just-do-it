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
    const tasksForProject = (projectId: number) => items.tasks.filter(task => task.projectId === projectId);
    const tasksForTag = (tagId: number) => items.tasks.filter(task => task.tagIds?.includes(tagId));

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
            {items.projects.filter(project => tasksForProject(project.id).length).map(project => (
                <TasksAccordion
                    key={project.id}
                    type="project"
                    typeId={project.id}
                    name={project.name}
                    tasks={tasksForProject(project.id)}
                    onChange={onChange}
                />
            ))}
            {items.tags.filter(tag => tasksForTag(tag.id).length).map(tag => (
                <TasksAccordion
                    key={tag.id}
                    type="tag"
                    typeId={tag.id}
                    name={tag.name}
                    tasks={tasksForTag(tag.id)}
                    onChange={onChange}
                />
            ))}
        </div>
    );
}

export default TasksContainer;
