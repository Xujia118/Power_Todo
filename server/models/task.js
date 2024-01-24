const mongoose = require("mongoose");
const Note = require("../models/note");


const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: [Note.schema],
  },
  data: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
