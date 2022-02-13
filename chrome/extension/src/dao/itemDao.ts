import { Item, Items, Project, Tag, Task } from "../types/all";

const currentItems: Items = {
    tasks: [],
    projects: [],
    tags: []
};

export function getCurrentProjects() {
    return currentItems.projects;
}

export function getCurrentTags() {
    return currentItems.tags;
}

export function getAllItems(callback: (items: Items) => void) {
    if (currentItems.tasks.length || currentItems.projects.length || currentItems.tags.length) {
        callback({
            tasks: currentItems.tasks.slice(),
            projects: currentItems.projects.slice(),
            tags: currentItems.tags.slice()
        });
        return;
    }
    chrome.storage.sync.get(
        ["tasks", "projects", "tags"],
        function (result) {
            const tasks: Task[] = (result.tasks && result.tasks.list) || [];
            const projects: Project[] = (result.projects && result.projects.list) || [];
            const tags: Tag[] = (result.tags && result.tags.list) || [];

            currentItems.tasks = tasks;
            currentItems.projects = projects;
            currentItems.tags = tags;
            callback({ tasks, projects, tags });
        }
    );
}

export function addItem<T extends Item>(key: "tasks" | "projects" | "tags", item: T, callback: () => void) {
    chrome.storage.sync.get(
        [key],
        function (result) {
            const itemsData = result[key] || { counter: 0, list: [] };
            const items: T[] = itemsData.list;

            item.id = itemsData.counter + 1;
            const newItems: T[] = items.concat(item);

            chrome.storage.sync.set(
                { [key]: { counter: itemsData.counter + 1, list: newItems } },
                function () {
                    currentItems[key] = newItems;
                    callback();
                }
            );
        }
    );
}

export function deleteItem<T extends Item>(key: "tasks" | "projects" | "tags", item: T, callback: () => void) {
    chrome.storage.sync.get(
        [key],
        function (result) {
            const itemsData = result[key] || { counter: 0, list: [] };
            const items: T[] = itemsData.list;

            const newItems: T[] = items.filter(i => i.id !== item.id);

            chrome.storage.sync.set(
                { [key]: { counter: itemsData.counter, list: newItems } },
                function () {
                    currentItems[key] = newItems;
                    callback();
                }
            );
        }
    );
}

export function updateItem<T extends Item>(key: "tasks" | "projects" | "tags", item: T, callback: () => void) {
    chrome.storage.sync.get(
        [key],
        function (result) {
            const itemsData = result[key] || { counter: 0, list: [] };
            const items: T[] = itemsData.list;

            item.version = item.version + 1;
            for (let i = 0; i < items.length; ++i) {
                if (items[i].id === item.id) {
                    items[i] = item;
                    break;
                }
            }

            chrome.storage.sync.set(
                { [key]: { counter: itemsData.counter, list: items } },
                function () {
                    currentItems[key] = items;
                    callback();
                }
            );
        }
    );
}
