var express = require('express');
var app = express();
var items = require('./data/items');

app.get('/items', function (req, res) {
  res.json(items);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('App running on port 3000');
});
