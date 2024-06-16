const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ajmp94",
  database: "expressconSQL",
});

db.connect();

module.exports = db;
