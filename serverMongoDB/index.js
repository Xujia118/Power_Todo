const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoURL = require('./config');

// Connect to MongoDB
async function connect() {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to MongoDB!')
    } catch(err) {
        console.log(err)
    }
}
connect();

// Middleware
const app = express();
app.use(express.json());
app.use(cors());

// Routes
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

const notesRouter = require('./routes/notes');
app.use('/tasks', notesRouter)

// Listen
app.listen(3001, () => {
    console.log("Server running on 3001");
})