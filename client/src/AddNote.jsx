import React, { useState } from "react";
import axios from "axios";

function AddNote({ noteList, setNoteList, taskId }) {
  const [newNote, setNewNote] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="note"
          value={newNote}
          placeholder="New note..."
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddNote;
