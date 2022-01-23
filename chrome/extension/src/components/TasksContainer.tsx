import React from 'react';
import ItemInput from './ItemInput';
import Accordion from './Accordion';

function TasksContainer() {
  return (
    <div>
      <div className="container">
        <Accordion type="today" name="Today (0)" />
        <Accordion type="tomorrow" name="Tomorrow (0)" />
        <Accordion type="upcoming" name="Upcoming (0)" />
        <Accordion type="unscheduled" name="Unscheduled (0)" />
        <Accordion type="completed" name="Completed (0)" />
      </div>
      <div className="task-input-container">
        <ItemInput type="task" />
        <i className="fa fa-calendar"></i>
        <i className="fa fa-list"></i>
        <i className="fa fa-tags"></i>
      </div>
    </div>
  );
}

export default TasksContainer;
