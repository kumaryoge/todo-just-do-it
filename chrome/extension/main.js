import { getGreeting } from './util.js';

$(function() {
    $('#greeting').html(getGreeting());
    setAccordians($(".accordion"));

    const today = $('#today');
    const tomorrow = $('#tomorrow');
    const upcoming = $('#upcoming');
    const unscheduled = $('#unscheduled');
    const completed = $('#completed');

    const projectsContainer = $('#projects');
    const tagsContainer = $('#tags');

    chrome.storage.sync.get(["tasks", "projects", "tags"], function(result) {
        const tasks = result.tasks || [];
        const projects = result.projects || [];
        const tags = result.tags || [];

        for (let i = 0; i < tags.length; ++i) {
            tagsContainer.append('<button class="accordion tag">' + tags[i].name + '</button>' 
                + '<div class="accordion-content"></div>');
        }
        setAccordians($(".accordion.tag"));
    });

    const taskInput = $('#task-input');
    const projectInput = $('#project-input');
    const tagInput = $('#tag-input');

    tagInput.keyup(function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action
            event.preventDefault();
            if (tagInput.val()) {
                chrome.storage.sync.get(["tags"], function(result) {
                    const tags = result.tags || [];
                    tags.push({
                        "id": tags.length + 1,
                        "name": tagInput.val()
                    });
                    chrome.storage.sync.set({
                       "tags": tags
                    }, function() {
                        tagsContainer.append('<button class="accordion tag">' + tagInput.val() + '</button>'
                            + '<div class="accordion-content"></div>');
                        setAccordians($(".accordion.tag"));
                        tagInput.val("");
                    });
                });
            }
        }
    });

});

function setAccordians(accordions) {
    for (let i = 0; i < accordions.length; ++i) {
        accordions[i].onclick = function() {
            this.classList.toggle('is-open');

            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                // accordion is currently open, so close it
                content.style.maxHeight = null;
            } else {
                // accordion is currently closed, so open it
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }
    }
}
