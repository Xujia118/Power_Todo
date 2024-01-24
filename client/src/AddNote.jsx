import React, { useState } from "react";

function AddNote() {
  const [newNote, setNewNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    

  }

  return (
    <div>
      <input
        type="text"
        name="note"
        value={newNote}
        placeholder="Add note"
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button type="submit" onSubmit={handleSubmit}>Add</button>
    </div>
  );
}

export default AddNote;
