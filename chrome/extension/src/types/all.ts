export type Items = {
    tasks: Task[];
    projects: Project[];
    tags: Tag[];
    settings: Settings;
};

export type Settings = {
    showBadge: boolean;
    autoExpandTodayList: boolean;
    autoCollapseLists: boolean;
    hideProjects: boolean;
    hideTags: boolean;
};

export type Item = {
    id: number;
    name: string;
    version: number;
};

export type Task = Item & {
    description?: string;
    projectId?: number;
    tagIds?: number[];
    dueDate?: DueDate;
    steps?: string[];
    effort?: Pomodoro;
    completed?: boolean;
};

export type Project = Item & {
};

export type Tag = Item & {
};

export type DueDate = {
    day: number;
    month: number;
    year: number;
    repeat?: RepeatPattern;
};

export type RepeatPattern = {
    frequency: Frequency;
    interval: number;
    weekDays?: number; // 7-bit number with a bit (from right to left) for each day of week from Sunday to Saturday
    endAfter?: number; // end after repetitions count
};

export type Frequency = "day" | "week" | "month" | "year";

export type Pomodoro = {
    estimate: number;
    spent: number;
};

export type TaskListType = "today" | "tomorrow" | "upcoming" | "unscheduled" | "completed" | "project" | "tag";
