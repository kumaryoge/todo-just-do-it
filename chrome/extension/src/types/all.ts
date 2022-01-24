export type Items = {
    tasks: Task[];
    projects: Project[];
    tags: Tag[];
};

export type Task = {
    id: number;
    name: string;
    description?: string;
    projectId?: number;
    tagIds?: number[];
    dueDate?: DueDate;
    steps?: string[];
    effort?: Pomodoro;
    completed?: boolean;
};

export type Project = {
    id: number;
    name: string;
};

export type Tag = {
    id: number;
    name: string;
};

export type DueDate = {
    date: Date;
    recurring?: RecurringPattern;
};

export type Date = {
    day: number;
    month: number;
    year: number;
};

export type RecurringPattern = {
    repeat: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
};

export type Pomodoro = {
    estimate: number;
    spent: number;
};
