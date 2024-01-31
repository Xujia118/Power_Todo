import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./NoteList.css";

function NoteList() {

  const { taskId } = useParams();

  // Get all notes of a task
  const [noteList, setNoteList] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    async function fetchNoteList() {
      try {
        const res = await axios.get(
          `http://localhost:3001/tasks/${taskId}/notes`
        );
        setNoteList(res.data);
      } catch(err) {
        console.log(err);
      }
    }
    fetchNoteList();
  }, [taskId]);

  return (
    <div>
      <ul className="note-menu">
        {noteList.map((note) => (
          <li className="note-item" key={note._id}>
            {note.name}
            <button className="button-delete">Delete</button>
            <label htmlFor="">
              Done
              <input type="radio" />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;