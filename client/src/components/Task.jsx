import React, { useState } from "react";
import {ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,} from 'semantic-ui-react'

const Task = ({task}) => {
  const [taskCompleted, setCompleted] = React.useState(task.completed);
  const [taskScheduled, setScheduled] = React.useState(task.scheduled);
  const [editOpen, setEditOpen] = React.useState(false);

  const [taskName, setName] = React.useState(task.title);
  const [taskDuration, setDuration] = React.useState(task.duration);
  const [taskDeadlineDate, setDeadlineDate] = React.useState(task.deadline[0]);
  const [taskDeadlineTime, setDeadlineTime] = React.useState(task.deadline[1]);

  const [tempTaskName, setTempName] = React.useState(task.title);
  const [tempTaskDuration, setTempDuration] = React.useState(task.duration);
  const [tempTaskDeadlineDate, setTempDeadlineDate] = React.useState(task.deadline[0]);
  const [tempTaskDeadlineTime, setTempDeadlineTime] = React.useState(task.deadline[1]);

  function handleNameChange(event) {
    setTempName(event.target.value);
  }
  function handleDurationChange(event) {
    setTempDuration(event.target.value);
  }
  function handleDeadlineDateChange(event) {
    setTempDeadlineDate(event.target.value);
  }
  function handleDeadlineTimeChange(event) {
    setTempDeadlineTime(event.target.value);
  }
  function confirmEdit() {
    setName(tempTaskName); task.title = taskName;
    setDuration(tempTaskDuration); task.duration = taskDuration;
    setDeadlineDate(tempTaskDeadlineDate); task.deadline[0] = taskDeadlineDate;
    setDeadlineTime(tempTaskDeadlineTime); task.deadline[1] = taskDeadlineTime;
    setEditOpen(false);
  }
  function cancelEdit() {
    setTempName(taskName);
    setTempDuration(taskDuration);
    setTempDeadlineDate(taskDeadlineDate);
    setTempDeadlineTime(taskDeadlineTime);
    setEditOpen(false);
  }
  
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
    <>
    <tr>
      <input type="checkbox" checked={taskCompleted} onClick={toggleTaskComplete}/>
      <td>{taskCompleted ? <s>{taskName}</s> : taskName}</td>
      <td>{taskDuration}</td>
      <td>{taskDeadlineDate} {taskDeadlineTime}</td>
      <td>{task.created}</td>
      <input type="checkbox" checked={taskScheduled} onClick={toggleTaskSchedule}/>
      <Modal
        onClose={cancelEdit}
        onOpen={() => setEditOpen(true)}
        open={editOpen}
        trigger={<Button>Edit Task</Button>}
      >
        <ModalHeader>Edit Task</ModalHeader>
        <ModalContent>
          <table>
            <tr><label>Task Name: </label> <input type="text" value={tempTaskName} onChange={handleNameChange}/></tr>
            <tr><label>Duration (min): </label> <input type="number" min="0" value={tempTaskDuration} onChange={handleDurationChange}/></tr>
            <tr>
              {<><label>Task Deadline: </label> <input type="date" value={tempTaskDeadlineDate} onChange={handleDeadlineDateChange}/> <input type="time" value={tempTaskDeadlineTime} onChange={handleDeadlineTimeChange}/></>}
            </tr>
          </table>
        </ModalContent>
        <ModalActions>
          <Button color="black" onClick={cancelEdit}>Cancel</Button>
          <Button
            content="Submit"
            labelPosition='right'
            icon='checkmark'
            onClick={confirmEdit}
            positive
          />
        </ModalActions>
      </Modal>
    </tr>
    </>
  )
};

export default Task;