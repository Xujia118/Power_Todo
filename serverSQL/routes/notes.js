const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all
router.get("/:taskId/notes", (req, res) => {
  const taskId = req.params.taskId;
  const q = `SELECT notes.content FROM notes
                JOIN tasks ON notes.task_id = tasks.task_id
                WHERE tasks.task_id = ?`;

  db.query(q, [taskId], (err, data) => {
    if (err) {
      console.log("Error fetching notes.");
      res.status(500).json({ message: "Error fetching notes." });
      return;
    }
    res.status(200).json(data);
  });
});

// Get one
router.get("/:taskId/notes/:noteId", (req, res) => {
  const taskId = req.params.taskId;
  const noteId = req.params.noteId;

  const q = `SELECT notes.content FROM notes
                JOIN tasks ON notes.task_id = tasks.task_id
                WHERE tasks.task_id = ? AND notes.note_id = ?`;

  db.query(q, [taskId, noteId], (err, data) => {
    if (err) {
      console.log("Error fecthing note.");
      res.status(500).json({ message: "Error fetching note." });
      return;
    }
    res.status(200).json(data);
  });
});

// Post
router.post("/:taskId/notes", (req, res) => {
  const taskId = req.params.taskId;

  const q = "INSERT INTO notes (`content`, `task_id`) VALUES (?)";
  const values = [req.body.content, taskId]; // The user doesn't know foreign key. We give it to him in url.

  db.query(q, [values], (err, data) => {
    if (err) {
      console.log("Unable to create note.");
      res.status(500).json({ message: "Unable to create note." });
      return;
    }
    console.log("Note created successfully.");
    res.status(201).json("Note created successfully.");
  });
});

// Delete
router.delete("/:taskId/notes/:noteId", (req, res) => {
  const taskId = req.params.taskId;
  const noteId = req.params.noteId;

  const q = `DELETE FROM notes
                WHERE task_id = ? AND note_id = ?`;

  db.query(q, [taskId, noteId], (err, data) => {
    if (err) {
      console.log("Unable to delete note.");
      res.status(500).json({ message: "Unable to delete note." });
      return;
    }
    console.log("Note deleted successfully.");
    res.status(200).json({ message: "Note deleted successfully." });
  });
});

// Update
router.patch("/:taskId/notes/:noteId", (req, res) => {
  const taskId = req.params.taskId;
  const noteId = req.params.noteId;
  const content = req.body.content;

  const q = `UPDATE notes SET content = ?
                WHERE task_id = ? AND note_id = ?`;

  db.query(q, [content, taskId, noteId], (err, data) => {
    if (err) {
      console.log("Error updating note.");
      res.status(500).json({ message: "Error updating note." });
      return;
    }
    console.log("Note updated successfully.");
    res.status(200).json({ message: "Note updated successfully." });
  });
});

module.exports = router;
