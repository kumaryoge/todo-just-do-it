export type Items = {
    tasks: Task[];
    projects: Project[];
    tags: Tag[];
    settings: Settings;
};

export type Settings = {
    showBadge: boolean;
    expandTodayList: boolean;
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
    recurring?: RecurringPattern;
};

export type RecurringPattern = {
    repeat: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
};

export type Pomodoro = {
    estimate: number;
    spent: number;
};

export type TaskListType = "today" | "tomorrow" | "upcoming" | "unscheduled" | "completed" | "project" | "tag";
