import React, { useState } from "react";
import axios from "axios";

import "./AddNote.css";

function AddNote({ noteList, setNoteList, taskId }) {
  const [newNote, setNewNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const noteValue = e.target.value;

    if (!noteValue.trim()) {
      setErrorMessage("Note cannot be empty");
    } else {
      setErrorMessage("");
    }

    setNewNote(noteValue);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!newNote) {
      setErrorMessage("Note cannot be empty");
      return
    } else {
      setErrorMessage("");
    }

    try {
      const res = await axios.post(
        `http://localhost:3001/tasks/${taskId}/notes`,
        {
          name: newNote, // Sending the new note data in the request body
        }
      );

      // Update the note list with the new note received from the server
      setNoteList([...noteList, res.data]);

      // Reset new note
      setNewNote("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="form-container">
      <form className="form note" onSubmit={handleSubmit}>
        <input
          className="input note"
          type="text"
          name="note"
          value={newNote}
          placeholder="New note..."
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
}

export default AddNote;
