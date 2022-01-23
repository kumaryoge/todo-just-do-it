import React from 'react';

interface Props {
    type: "today" | "tomorrow" | "upcoming" | "unscheduled" | "completed" | "project" | "tag";
    name: string;
}

const Accordion: React.FC<Props> = ({ type, name }) => {
    const [isOpen, setOpen] = React.useState(false);

    return (
        <div>
            <button
                className={type + " accordion " + (isOpen ? "is-open" : "")}
                onClick={() => setOpen(!isOpen)}
            >
                {name}
            </button>
            <div
                className={"accordion-content " + (!isOpen ? "is-closed" : "")}
            >
                TODO
            </div>
        </div>
    );
}

export default Accordion;
