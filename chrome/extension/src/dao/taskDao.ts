import { Task } from "../types/all";

export function addTask(task: Task, callback: () => void) {
    chrome.storage.sync.get(
        ["tasks"],
        function (result) {
            const tasks: Task[] = result.tasks || [];

            task.id = tasks.length + 1;
            const newTasks: Task[] = tasks.concat(task);

            chrome.storage.sync.set(
                { tasks: newTasks },
                function () {
                    callback();
                }
            );
        }
    );
}

export function deleteTask(task: Task, callback: () => void) {
    chrome.storage.sync.get(
        ["tasks"],
        function (result) {
            const tasks: Task[] = result.tasks || [];

            const newTasks: Task[] = tasks.filter(t => t.id !== task.id);

            chrome.storage.sync.set(
                { tasks: newTasks },
                function () {
                    callback();
                }
            );
        }
    );
}

export function updateTask(task: Task, callback: () => void) {
    chrome.storage.sync.get(
        ["tasks"],
        function (result) {
            const tasks: Task[] = result.tasks || [];

            const newTasks: Task[] = tasks.filter(t => t.id !== task.id).concat(task);

            chrome.storage.sync.set(
                { tasks: newTasks },
                function () {
                    callback();
                }
            );
        }
    );
}
