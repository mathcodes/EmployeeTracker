require("dotenv").config();
const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Carrboro"
})

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    readconnection();
});

connection.query = util.promisify(connection.query);

module.exports = connection;

function readColleges() {
    connection.query("SELECT name FROM colleges", function(err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    })
}