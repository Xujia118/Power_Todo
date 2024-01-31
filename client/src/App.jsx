import { BrowserRouter, Routes, Route } from "react-router-dom";

import TaskList from "./TaskList";
import NoteList from "./NoteList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/:taskId/notes" element={<NoteList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
