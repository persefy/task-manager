import React, { useState } from "react";

const Task = ({task}) => {
  const [taskCompleted, setCompleted] = React.useState(task.completed);
  const [taskScheduled, setScheduled] = React.useState(task.scheduled);
  
  function toggleTaskComplete() {
    const updatedCompletion = !taskCompleted;
    setCompleted(updatedCompletion);
    task.completed = updatedCompletion;
  }

  function toggleTaskSchedule() {
    const updatedSchedule = !taskScheduled;
    setScheduled(updatedSchedule);
    task.scheduled = updatedSchedule;
  }

  return (
    <tr>
      <input type="checkbox" checked={taskCompleted} onClick={toggleTaskComplete}/>
      <td>{taskCompleted ? <s>{task.title}</s> : task.title}</td>
      <td>{task.duration}</td>
      <td>{task.deadline[0]} {task.deadline[1]}</td>
      <td>{task.created}</td>
      <input type="checkbox" checked={taskScheduled} onClick={toggleTaskSchedule}/>
    </tr>
  )
};

export default Task;