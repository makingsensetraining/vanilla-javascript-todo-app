var express = require('express');
var app = express();
var items = require('./data/items');
var port = process.env.PORT || 3000;

app.get('/items', function (req, res) {
  res.json(items);
});

app.use(express.static('.'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function () {
  console.log('App running on port ' + port);
});
