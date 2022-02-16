import { DueDate, Task, TaskListType } from "../types/all";

export const ITEM_NAME_MAX_LENGTH = 256;

export function getGreeting() {
    const hour = new Date().getHours();
    return "Good " + (hour < 12 ? "Morning" : (hour < 18 ? "Afternoon" : "Evening")) + "!";
}

export function filterTodaysTasks(tasks: Task[]) {
    const today = toDueDate(new Date());

    return tasks
        .filter(task => !task.completed)
        .filter(task => {
            if (task.dueDate) {
                const date = task.dueDate;
                return (date.year < today.year)
                    || (date.year === today.year && date.month < today.month)
                    || (date.year === today.year && date.month === today.month && date.day <= today.day);
            }
            return false;
        });
}

export function filterTomorrowsTasks(tasks: Task[]) {
    const temp = new Date();
    temp.setDate(temp.getDate() + 1);
    const tomorrow = toDueDate(temp);

    return tasks
        .filter(task => !task.completed)
        .filter(task => {
            if (task.dueDate) {
                const date = task.dueDate;
                return date.day === tomorrow.day
                    && date.month === tomorrow.month
                    && date.year === tomorrow.year;
            }
            return false;
        });
}

export function filterUpcomingTasks(tasks: Task[]) {
    const temp = new Date();
    temp.setDate(temp.getDate() + 1);
    const tomorrow = toDueDate(temp);

    return tasks
        .filter(task => !task.completed)
        .filter(task => {
            if (task.dueDate) {
                const date = task.dueDate;
                return (date.year > tomorrow.year)
                    || (date.year === tomorrow.year && date.month > tomorrow.month)
                    || (date.year === tomorrow.year && date.month === tomorrow.month && date.day > tomorrow.day);
            }
            return false;
        });
}

export function filterUnscheduledTasks(tasks: Task[]) {
    return tasks
        .filter(task => !task.completed)
        .filter(task => !task.dueDate);
}

export function filterCompletedTasks(tasks: Task[]) {
    return tasks.filter(task => task.completed);
}

export function toNormalDate(dueDate: DueDate): Date {
    return new Date(dueDate.year, dueDate.month - 1, dueDate.day);
}

export function toDueDate(date: Date): DueDate {
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    };
}

export function isPastDate(d: Date): boolean {
    const date = toDueDate(d);
    const today = toDueDate(new Date());
    return (date.year < today.year)
        || (date.year === today.year && date.month < today.month)
        || (date.year === today.year && date.month === today.month && date.day < today.day);
}

export function getNewTaskDueDate(type: TaskListType): DueDate | undefined {
    if (type === "today") {
        return toDueDate(new Date());
    }
    if (type === "tomorrow") {
        const temp = new Date();
        temp.setDate(temp.getDate() + 1);
        return toDueDate(temp);
    }
    if (type === "upcoming") {
        const temp = new Date();
        temp.setDate(temp.getDate() + 7);
        return toDueDate(temp);
    }
}

export function truncate(str: string): string {
    if (!str) {
        return str;
    }
    const maxLen = 2;
    return str.length <= maxLen ? str : str.substring(0, maxLen) + "..";
}
