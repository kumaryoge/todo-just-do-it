import { DueDate, RepeatPattern, Settings, Task, TaskListType } from "../types/all";

export const ITEM_NAME_MAX_LENGTH = 512;
export const TOOLTIP_ENTER_DELAY = 700;
export const TOOLTIP_LEAVE_DELAY = 200;
export const DEFAULT_SETTINGS: Settings = {
    showBadge: false,
    autoExpandTodayList: true,
    autoCollapseLists: true,
    hideProjects: false,
    hideTags: false
};

const dateFormat: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" };
const dateFormatLong: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

export function getDateTooltipTitle(savedDate: Date | null, savedRepeat?: RepeatPattern) {
    return (savedDate &&
        (savedDate.toLocaleDateString(navigator.language, dateFormatLong) +
            (savedRepeat
                ? ` | Repeats every ${savedRepeat.interval} ${savedRepeat.frequency}${savedRepeat.interval > 1 ? "s" : ""}`
                : "")
        )
    ) || "Add a due date to this task";
}

export function getDateChipLabel(savedDate: Date | null) {
    return (savedDate && savedDate.toLocaleDateString(navigator.language, dateFormat)) || "+";
}

export function getGreeting() {
    const hour = new Date().getHours();
    return "Good " + (hour < 12 ? "Morning" : (hour < 18 ? "Afternoon" : "Evening"));
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

export function toDueDate(date: Date, repeat?: RepeatPattern): DueDate {
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        repeat: repeat
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

export function getNextDueDate(dueDate: DueDate, repeat: RepeatPattern) {
    const date: Date = toNormalDate(dueDate);
    switch (repeat.frequency) {
        case "day":
            date.setDate(date.getDate() + repeat.interval);
            break;
        case "week":
            date.setDate(date.getDate() + repeat.interval * 7);
            break;
        case "month":
            date.setMonth(date.getMonth() + repeat.interval);
            break;
        case "year":
            date.setFullYear(date.getFullYear() + repeat.interval);
            break;
    }
    return toDueDate(date, repeat);
}

export function truncate(str: string): string {
    if (!str) {
        return str;
    }
    const maxLen = 2;
    return str.length <= maxLen ? str : str.substring(0, maxLen) + "..";
}

export function shallowEquals(object1: any, object2: any) {
    if (!object1 || !object2) {
        return object1 === object2;
    }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }
    return true;
}
