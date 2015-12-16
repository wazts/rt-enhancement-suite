var express = require('express');
var app = express();

app.use('/css', express.static(__dirname + '/../css'));
app.use('/images', express.static(__dirname + '/../images'));
app.use('/js', express.static(__dirname + '/../js'));
app.use(express.static(__dirname + '/../html'));
app.use(express.static(__dirname + '/../tests'));

var port = process.env.PORT || 3000;
var host = process.env.IP || 'localhost';

var server = app.listen(port, host, function () {
  console.log('Example app listening at http://%s:%s', host, port);
});