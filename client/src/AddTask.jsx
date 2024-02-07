import { useState, useRef } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./AddTask.css";

function AddTask({ taskList, setTaskList }) {
  const dialogRef = useRef();

  const [newTask, setNewTask] = useState({
    name: "",
    notes: [],
  });

  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const newTaskName = e.target.value;
    setNewTask({ ...newTask, name: newTaskName });

    if (newTaskName) {
      setErrorMessage("");
    }
  }

  function handleButtonSubmit(e) {
    e.preventDefault();

    if (!newTask.name) {
      setErrorMessage("Task cannot be empty");
    } else {
      handleFormSubmit(e);
      dialogRef.current.close();
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      // Make the POST request to create a new task
      const res = await axios.post("http://localhost:3001/tasks", newTask);

      // Update the taskList state ONLY AFTER the POST request succeeds
      setTaskList([...taskList, res.data]);

      // Reset newTask state
      setNewTask({
        name: "",
        notes: [],
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="modal">
      <button
        className="new-task-button"
        type="button"
        onClick={() => dialogRef.current.showModal()}
      >
        <FontAwesomeIcon icon={faPlus} size="2xl" />
      </button>

      <dialog className="dialog" ref={dialogRef}>
        <form className="form task" onSubmit={handleFormSubmit}>
          <input
            className="input task"
            type="text"
            name="task"
            value={newTask.name}
            placeholder="New task..."
            onChange={handleChange}
          />
          <button
            className="submit-button"
            type="submit"
            onClick={handleButtonSubmit}
          >
            Add
          </button>
        </form>
        <p className="error-message">{errorMessage}</p>
      </dialog>
    </div>
  );
}

export default AddTask;
