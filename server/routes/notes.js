const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const Note = require("../models/note");

// Get all notes
router.get("/:taskId/notes", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findOne({
      _id: taskId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const notes = task.notes;
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
router.get("/:taskId/notes/:noteId", async (req, res) => {
  try {
    const task = await Task.findById({_id: req.params.taskId});
    if (!task) {
        return res.status(404).json({ message: "Task not found."});
    }

    const note = task.notes.id({ _id: req.params.noteId});
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    } 
    
    res.json(note);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Post
router.post("/:taskId/notes", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // What if I need to input more?
    const { name } = req.body;
    const note = new Note({ name });
    const newNote = await note.save();

    // Push note to the task
    task.notes.push(newNote); // Remember: note is also an object
    await task.save();
    res.status(201).json(newNote);

  } catch (err) {
    res.status(400).json({ message: "Invalid Task ID" });
  }
});

// Delete one
router.delete("/:taskId/notes/:noteId", async (req, res) => {
  try {
    const result = await Task.findByIdAndUpdate(
      { _id: req.params.taskId },
      { $pull: { notes: { _id: req.params.noteId } } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Task or Note not found." });
    }

    res.json({ message: "Note deleted." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Update
router.patch("/:taskId/notes/:noteId", async (req, res) => {
  try {
    // Step 1: Find the task
    const task = await Task.findById({ _id: req.params.taskId });
    
    // Step 2: Check if the task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Step 3: Find the note within the task
    const note = task.notes.id({ _id: req.params.noteId });
    
    // Step 4: Check if the note exists
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
    
    console.log("note", note)

    // // Step 5: Update the note attributes
    note.name = req.body.name; 

    // Step 5: Update the note attributes
    // for (const [key, value] of Object.entries(req.body.updatedNote)) {
    //   // Check if the property exists in the note before updating
    //   if (note[key] !== undefined) {
    //     note[key] = value;
    //   }
    // }

    // Step 6: Save the updated task
    await task.save();

    res.json({ message: "Note updated." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
