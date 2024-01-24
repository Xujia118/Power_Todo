import { useState } from "react";
import axios from "axios";

function AddTask({ taskList, setTaskList }) {
  const [newTask, setNewTask] = useState({
    name: "",
    notes: [],
  });

  async function handleSubmit(e) {
    e.preventDefault();

    setTaskList([...taskList, newTask]);

    try {
      await axios.post("http://localhost:3001/tasks", newTask);

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={newTask.name}
          placeholder="New task..."
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddTask;
