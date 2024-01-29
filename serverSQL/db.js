const mysql = require("mysql2");

// Connect to Database
const db = mysql.createConnection({
  user: "root",
  password: "password",
  database: "todos_app",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MYSQL server:", err);
    return;
  }
  console.log("Connected to MySQL server.");
});

module.exports = db;
