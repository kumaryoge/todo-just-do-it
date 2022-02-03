const Icons = {
    smartList: "fa fa-circle",
    project: "fa fa-tasks",
    tag: "fa fa-tag",
    date: "fa fa-calendar",
    tags: "fa fa-tags",
    task: "fa fa-circle-o",
    completedTask: "fa fa-check-circle",
    add: "fa fa-plus",
    delete: "fa fa-trash",
    update: "fa fa-edit",
    yes: "fa fa-check",
    no: "fa fa-times",
};

export function icon(type: keyof typeof Icons, onClick?: () => void) {
    if (onClick) {
        return <span className={"icon clickable " + Icons[type]} onClick={onClick}></span>;
    }
    return <span className={"icon " + Icons[type]}></span>;
}
