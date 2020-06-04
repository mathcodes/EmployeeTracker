require("dotenv").config(); 
const mysql = require("mysql");
const util = require('util');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "8000",
    password: process.env.DB_PASSWORD,
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
});

connection.query = util.promisify(connection.query);

module.exports = connection;
