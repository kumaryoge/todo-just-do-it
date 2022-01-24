import { Project } from "../types/all";

export function addProject(project: Project, callback: () => void) {
    chrome.storage.sync.get(
        ["projects"],
        function (result) {
            const projects: Project[] = result.projects || [];

            project.id = projects.length + 1;
            const newProjects: Project[] = projects.concat(project);

            chrome.storage.sync.set(
                { projects: newProjects },
                function () {
                    callback();
                }
            );
        }
    );
}

export function deleteProject(project: Project, callback: () => void) {
    chrome.storage.sync.get(
        ["projects"],
        function (result) {
            const projects: Project[] = result.projects || [];

            const newProjects: Project[] = projects.filter(p => p.id !== project.id);

            chrome.storage.sync.set(
                { projects: newProjects },
                function () {
                    callback();
                }
            );
        }
    );
}

export function updateProject(project: Project, callback: () => void) {
    chrome.storage.sync.get(
        ["projects"],
        function (result) {
            const projects: Project[] = result.projects || [];

            const newProjects: Project[] = projects.filter(p => p.id !== project.id).concat(project);

            chrome.storage.sync.set(
                { projects: newProjects },
                function () {
                    callback();
                }
            );
        }
    );
}
