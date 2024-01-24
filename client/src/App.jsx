import React, { useState } from "react";

import AddTask from "./AddTask";
import TaskList from "./TaskList";

function App() {
  const [taskList, setTaskList] = useState([]);

  return (
    <div>
      <AddTask taskList={taskList} setTaskList={setTaskList} />
      <TaskList taskList={taskList} setTaskList={setTaskList} />
    </div>
  );
}

export default App;
