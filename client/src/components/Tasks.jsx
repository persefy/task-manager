import React, { useState } from "react";

const intitialList = [];

function Tasks() {
  const [taskList, setTasks] = React.useState(intitialList);
  const [taskID, setID] = React.useState(1);
  const [taskName, setName] = React.useState('');
  const [taskDuration, setDuration] = React.useState(0);
  const [taskDeadlineDate, setDeadlineDate] = React.useState();
  const [taskDeadlineTime, setDeadlineTime] = React.useState();
  
  const [showTaskForm, setShowTaskForm] = React.useState(false);
  function toggleTaskForm() {
    setShowTaskForm(!showTaskForm);
  }
  const [showTaskDeadline, setShowTaskDeadline] = React.useState(false);
  function toggleTaskDeadline() {
    setShowTaskDeadline(!showTaskDeadline);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleDurationChange(event) {
    setDuration(event.target.value);
  }
  function handleDeadlineDateChange(event) {
    setDeadlineDate(event.target.value);
  }
  function handleDeadlineTimeChange(event) {
    setDeadlineTime(event.target.value);
  }

  function addTask() {
    const newList = taskList.concat({id: taskID, title: taskName, duration: taskDuration, deadline: [taskDeadlineDate, taskDeadlineTime]});
    setTasks(newList);
    setName('');
    setID(taskID+1);
    setDuration(0);
    setDeadlineDate("");
    setDeadlineTime("");
  }

  return (
    <>
    <section>
        <h2>Tasks</h2>
        {/*display task list here*/}
          <table>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Deadline</th>
            </tr>
            {
              taskList.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.duration}</td>
                  <td>{task.deadline}</td>
                </tr>
              ))
            }
          </table>
        {/*
        “plus” button that displays a form that takes the following input for a Task Item:
        -- Title [Text]
        -- Duration [In Min]
        -- Enable Scheduling? [Boolean]
        -- Deadline [Date, Time]
        */}
      <button type="button" onClick={toggleTaskForm}> + </button>
      {
        showTaskForm ?
          (<table>
            <tr><label>Task Name: </label> <input type="text" value={taskName} onChange={handleNameChange} /></tr>
            <tr><label>Duration (min): </label> <input type="number" min="0" value={taskDuration} onChange={handleDurationChange}/></tr>
            <tr>
              {!showTaskDeadline ? <label>Set a Deadline?</label> : null}
              <input type="checkbox" checked={showTaskDeadline} onClick={toggleTaskDeadline}/>
              {showTaskDeadline ? <><label>Task Deadline: </label> <input type="date" onChange={handleDeadlineDateChange}/> <input type="time" onChange={handleDeadlineTimeChange}/></> : null}
            </tr>
            <tr><button type="button" onClick={addTask}>Add Task</button></tr>
          </table>)
        :
          null
      }
    </section>
    </>
  )
}

export default Tasks