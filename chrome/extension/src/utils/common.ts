import { Task } from "../types/all";

export function getGreeting() {
    const hour = new Date().getHours();
    return "Good " + (hour < 12 ? "Morning" : (hour < 18 ? "Afternoon" : "Evening")) + "!";
}

export function filterTodaysTasks(tasks: Task[]) {
    const today = new Date();

    return tasks
        .filter(task => !task.completed)
        .filter(task => {
            if (task.dueDate) {
                const date = task.dueDate.date;
                return date.day === today.getDate()
                    && date.month === today.getMonth() + 1
                    && date.year === today.getFullYear();
            }
            return false;
        });
}

export function filterTomorrowsTasks(tasks: Task[]) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tasks
        .filter(task => !task.completed)
        .filter(task => {
            if (task.dueDate) {
                const date = task.dueDate.date;
                return date.day === tomorrow.getDate()
                    && date.month === tomorrow.getMonth() + 1
                    && date.year === tomorrow.getFullYear();
            }
            return false;
        });
}

export function filterUpcomingTasks(tasks: Task[]) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tasks
        .filter(task => !task.completed)
        .filter(task => {
            if (task.dueDate) {
                const date = task.dueDate.date;
                const isDateToday = date.day === today.getDate()
                    && date.month === today.getMonth() + 1
                    && date.year === today.getFullYear();
                const isDateTomorrow = date.day === tomorrow.getDate()
                    && date.month === tomorrow.getMonth() + 1
                    && date.year === tomorrow.getFullYear();
                return !(isDateToday || isDateTomorrow);
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
