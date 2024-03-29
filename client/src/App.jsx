import { BrowserRouter, Routes, Route } from "react-router-dom";

import TaskList from "./TaskList";
import NoteList from "./NoteList";

import "./App.css"

function App() {
  return (
      <Routes>
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/:taskId/notes" element={<NoteList />} />
      </Routes>
  );
}

export default App;
