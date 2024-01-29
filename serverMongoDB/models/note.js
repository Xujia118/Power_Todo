const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  data: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", noteSchema);
