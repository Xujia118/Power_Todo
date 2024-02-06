import { useState } from "react";
import axios from "axios";

function AddTask({ taskList, setTaskList }) {
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
    <div>
      <form className="form-add-task" onSubmit={handleSubmit}>
        <input
          className="input-add-task"
          type="text"
          name="task"
          value={newTask.name}
          placeholder="New task..."
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <button className="button-add-task">Add</button>
      </form>
    </div>
  );
}

export default AddTask;
