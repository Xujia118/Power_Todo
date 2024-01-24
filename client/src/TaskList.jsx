import React, { useEffect } from "react";
import axios from "axios";

function TaskList({ taskList, setTaskList }) {
  // Get all tasks
  useEffect(() => {
    async function fetchTaskList() {
      try {
        const res = await axios.get("http://localhost:3001/tasks");
        setTaskList(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTaskList();
  }, []);

  // Delete one task
  async function handleDelete(taskId) {
    try {
      await axios.delete("http://localhost:3001/tasks/" + taskId);

      setTaskList((prevTaskList) =>
        prevTaskList.filter((task) => task._id !== taskId)
      );

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ul> 
      {taskList.map((task) => (
        <li key={task._id}>
          {task.name}
          <button>View</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
