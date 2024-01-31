import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AddTask from "./AddTask";

import "./TaskList.css";

function TaskList() {
  const [taskList, setTaskList] = useState([]);

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
      await axios.delete(`http://localhost:3001/tasks/${taskId}`);

      setTaskList((prevTaskList) =>
        prevTaskList.filter((task) => task._id !== taskId)
      );
    } catch (err) {
      console.log(err);
    }
  }

  const navigate = useNavigate();

  return (
    <main>
      <AddTask taskList={taskList} setTaskList={setTaskList} />

      <div className="task-container">
        <ul className="task-menu">
          {taskList.map((task) => (
            <li className="task-item" key={task._id}>
              {task.name}
              <div className="button-container">
                <button onClick={() => navigate(`/tasks/${task._id}/notes`)}>
                  View
                </button>
                <button
                  className="button-delete"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default TaskList;
