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

  async function handleSubmit(e) {
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
        <form className="form task" onSubmit={handleSubmit}>
          <input
            className="input task"
            type="text"
            name="task"
            value={newTask.name}
            placeholder="New task..."
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <button
            className="submit-button"
            type="button"
            onClick={() => dialogRef.current.close()}
          >
            Add
          </button>
        </form>
      </dialog>
    </div>
  );
}

export default AddTask;
