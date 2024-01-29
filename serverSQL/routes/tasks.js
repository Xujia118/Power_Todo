const express = require("express");
const router = express.Router();
const db = require("../db");

// const Task = require("../models/task"); // Do we have to create models in SQL?

// Get all
router.get("/", (req, res) => {
  const q = "SELECT * FROM tasks";
  db.query(q, (err, data) => {
    if (err) {
      console.log("Error fetching taks:", err);
      res.status(500).json({ error: "Error fecthing tasks." });
      return;
    }
    res.status(200).json(data);
  });
});

// Get one
router.get("/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "SELECT * FROM tasks WHERE id = ?";
  db.query(q, [taskId], (err, data) => {
    if (err) {
      console.log("Error fetching task:", task);
      res.status(500).json({ err: "Error fetching task." });
      return;
    }
    res.status(200).json(data[0]);
  });
});

// Post
router.post("/", (req, res) => {
  const q = "INSERT INTO tasks (`title`, `content`) VALUES (?)";
  const values = [req.body.title, req.body.content];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.log("Unable to create task.");
      res.status(500).json({ error: "Unable to create task." });
      return;
    } else {
      console.log("Task created successfully.");
      res.status(201).json({ message: "Task created successfully." });
    }
  });
});

// Delete
router.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "DELETE FROM tasks WHERE id = ?";
  db.query(q, [taskId], (err, data) => {
    if (err) {
      console.log("Error deleting task:");
      res.status(500).json({ err: "Error deleting task." });
      return;
    }
    console.log("Task deleted successfully");
    res.status(200).json({ message: "Task deleted successfully" });
  });
});

// Update
router.patch("/:id", (req, res) => {
  const taskId = req.params.id;
  const { title, content } = req.body;
  const q = "UPDATE tasks SET `title` = ?, `content` = ? WHERE id = ?";

  db.query(q, [title, content, taskId], (err, data) => {
    if (err) {
      console.log("Error updating task:");
      res.status(500).json({ err: "Error updating task." });
      return;
    }
    console.log("Task updated successfully.");
    res.status(200).json({ message: "Task updated successfully." });
  });
});
 
module.exports = router;
