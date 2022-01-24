import { Tag } from "../types/all";

export function addTag(tag: Tag, callback: () => void) {
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
}
