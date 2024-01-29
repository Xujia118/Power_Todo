const express = require("express");
const cors = require("cors");

// Middleware
const app = express();
app.use(express.json());
app.use(cors());

// Routes
const taskRoute = require("./routes/tasks");
app.use("/tasks", taskRoute);

// const noteRoute = require("./routes/notes");
// app.use("/notes", noteRoute);

// Listen
app.listen(3001, () => {
  console.log("Server running on port 3001.");
});


