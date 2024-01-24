const express = require("express");
const router = express.Router();
const Task = require("../models/task");


// Get all
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
    });

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Post
router.post("/", async (req, res) => {
  const task = new Task({
    name: req.body.name,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.deleteOne({
      _id: req.params.id,
    });

    if (task) {
      res.json("Task delete.");
    } else {
      res.status(404).json({ message: "Task not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Update
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (task) {
      res.json("Task updated.");
    } else {
      res.status(404).json({ message: "Task not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
