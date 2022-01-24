import { Items, Project, Tag, Task } from "../types/all";

export function getAllItems(callback: (items: Items) => void) {
    callback({
        tasks: [
            {
                id: 1,
                name: "Task 1"
            },
            {
                id: 2,
                name: "Task 2",
                description: "Describe task 2."
            },
            {
                id: 3,
                name: "Task 3",
                projectId: 1,
                dueDate: {
                    date: {
                        day: 23,
                        month: 1,
                        year: 2022
                    }
                }
            },
            {
                id: 4,
                name: "Task 4",
                tagIds: [1],
                dueDate: {
                    date: {
                        day: 24,
                        month: 1,
                        year: 2022
                    }
                }
            },
            {
                id: 5,
                name: "Task 5",
                projectId: 2,
                tagIds: [1, 2],
                dueDate: {
                    date: {
                        day: 25,
                        month: 1,
                        year: 2022
                    }
                }
            },
            {
                id: 6,
                name: "Task 6",
                completed: true
            }
        ],
        projects: [
            {
                id: 1,
                name: "Project 1"
            },
            {
                id: 2,
                name: "Project 2"
            },
            {
                id: 3,
                name: "Project 3"
            }
        ],
        tags: [
            {
                id: 1,
                name: "Tag 1"
            },
            {
                id: 2,
                name: "Tag 2"
            },
            {
                id: 3,
                name: "Tag 3"
            }
        ]
    });

    /* chrome.storage.sync.get(
        ["tasks", "projects", "tags"],
        function (result) {
            const tasks: Task[] = result.tasks || [];
            const projects: Project[] = result.projects || [];
            const tags: Tag[] = result.tags || [];

            callback(tasks, projects, tags);
        }
    ); */
}

/* export function addTag(tag: Tag, callback: () => void) {
    chrome.storage.sync.get(
        ["tags"],
        function (result) {
            const tags: Tag[] = result.tags || [];

            tag.id = tags.length + 1;
            const newTags: Tag[] = tags.concat(tag);

            chrome.storage.sync.set(
                { tags: newTags },
                function () {
                    callback();
                }
            );
        }
    );
}

export function deleteTag(tag: Tag, callback: () => void) {
    chrome.storage.sync.get(
        ["tags"],
        function (result) {
            const tags: Tag[] = result.tags || [];

            const newTags: Tag[] = tags.filter(t => t.id !== tag.id);

            chrome.storage.sync.set(
                { tags: newTags },
                function () {
                    callback();
                }
            );
        }
    );
}

export function updateTag(tag: Tag, callback: () => void) {
    chrome.storage.sync.get(
        ["tags"],
        function (result) {
            const tags: Tag[] = result.tags || [];

            const newTags: Tag[] = tags.filter(t => t.id !== tag.id).concat(tag);

            chrome.storage.sync.set(
                { tags: newTags },
                function () {
                    callback();
                }
            );
        }
    );
} */
