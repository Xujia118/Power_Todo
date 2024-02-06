import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AddNote from "./AddNote";

import "./NoteList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function NoteList() {
  const { taskId } = useParams();

  // Get all notes of a task
  const [noteList, setNoteList] = useState([]);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch task details
        const taskResponse = await axios.get(
          `http://localhost:3001/tasks/${taskId}`
        );
        setTaskName(taskResponse.data.name);

        // Fetch notes beloning to the task
        const res = await axios.get(
          `http://localhost:3001/tasks/${taskId}/notes`
        );
        setNoteList(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [taskId]);

  async function handleDelete(noteId) {
    try {
      axios.delete(`http://localhost:3001/tasks/${taskId}/notes/${noteId}`);

      setNoteList((prevNoteList) =>
        prevNoteList.filter((note) => note._id != noteId)
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <div>
        <h2>{taskName}</h2>
      </div>

      <AddNote noteList={noteList} setNoteList={setNoteList} taskId={taskId} />

      <div className="note-container">
        <ul className="note-menu">
          {noteList.map((note) => (
            <li className="note-item" key={note._id}>
              {note.name}
              <div className="button-container">
                <button
                  className="button-delete"
                  onClick={() => handleDelete(note._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <label htmlFor="">
                  Done
                  <input type="checkbox" />
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default NoteList;
