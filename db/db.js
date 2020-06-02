var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'local host',
    user: 'root',
    password: '',
    database: 'chat'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;