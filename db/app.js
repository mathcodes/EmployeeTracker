var express = require('express');
var app = express();
var db = require('./db');

app.get('/save', function(req, res) {
    var post = { from: 'me', to: 'you', msg: 'hi' };
    db.query('INSERT INTO messages SET ?', post, function(err, result) {
        if (err) throw err;
    });
});

server.listen(8000);