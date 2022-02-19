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
    expandStatus: { [key: string]: boolean; };
    updateExpandStatus(key: string, value: boolean): void;
}

function TasksContainer({ items, onChange, expandStatus, updateExpandStatus }: Props) {
    const tasksForProject = (projectId: number) => items.tasks.filter(task => task.projectId === projectId);
    const tasksForTag = (tagId: number) => items.tasks.filter(task => task.tagIds?.includes(tagId));

    return (
        <div>
            <TasksAccordion
                type="today"
                name="Today"
                tasks={filterTodaysTasks(items.tasks)}
                onChange={onChange}
                expand={expandStatus.today}
                onExpand={(expanded) => updateExpandStatus("today", expanded)}
                hideProjects={items.settings.hideProjects}
                hideTags={items.settings.hideTags}
            />
            <TasksAccordion
                type="tomorrow"
                name="Tomorrow"
                tasks={filterTomorrowsTasks(items.tasks)}
                onChange={onChange}
                expand={expandStatus.tomorrow}
                onExpand={(expanded) => updateExpandStatus("tomorrow", expanded)}
                hideProjects={items.settings.hideProjects}
                hideTags={items.settings.hideTags}
            />
            <TasksAccordion
                type="upcoming"
                name="Upcoming"
                tasks={filterUpcomingTasks(items.tasks)}
                onChange={onChange}
                expand={expandStatus.upcoming}
                onExpand={(expanded) => updateExpandStatus("upcoming", expanded)}
                hideProjects={items.settings.hideProjects}
                hideTags={items.settings.hideTags}
            />
            <TasksAccordion
                type="unscheduled"
                name="Unscheduled"
                tasks={filterUnscheduledTasks(items.tasks)}
                onChange={onChange}
                expand={expandStatus.unscheduled}
                onExpand={(expanded) => updateExpandStatus("unscheduled", expanded)}
                hideProjects={items.settings.hideProjects}
                hideTags={items.settings.hideTags}
            />
            <TasksAccordion
                type="completed"
                name="Completed"
                tasks={filterCompletedTasks(items.tasks)}
                onChange={onChange}
                expand={expandStatus.completed}
                onExpand={(expanded) => updateExpandStatus("completed", expanded)}
                hideProjects={items.settings.hideProjects}
                hideTags={items.settings.hideTags}
            />
            {!items.settings.hideProjects &&
                items.projects.filter(project => tasksForProject(project.id).length).map(project => (
                    <TasksAccordion
                        key={project.id}
                        type="project"
                        typeId={project.id}
                        name={project.name}
                        tasks={tasksForProject(project.id)}
                        onChange={onChange}
                        expand={expandStatus["project" + project.id]}
                        onExpand={(expanded) => updateExpandStatus("project" + project.id, expanded)}
                        hideProjects={items.settings.hideProjects}
                        hideTags={items.settings.hideTags}
                    />
                ))}
            {!items.settings.hideTags &&
                items.tags.filter(tag => tasksForTag(tag.id).length).map(tag => (
                    <TasksAccordion
                        key={tag.id}
                        type="tag"
                        typeId={tag.id}
                        name={tag.name}
                        tasks={tasksForTag(tag.id)}
                        onChange={onChange}
                        expand={expandStatus["tag" + tag.id]}
                        onExpand={(expanded) => updateExpandStatus("tag" + tag.id, expanded)}
                        hideProjects={items.settings.hideProjects}
                        hideTags={items.settings.hideTags}
                    />
                ))}
        </div>
    );
}

export default TasksContainer;
