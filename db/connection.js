require("dotenv").config();
const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 8000
    port: 8000,

    // Your username
    user: "jonchr",

    // Your password
    password: "Momomo9!",
    database: "employee_DB"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    readConnection();
});

connection.query = util.promisify(connection.query);

module.exports = connection;