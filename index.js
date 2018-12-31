var express = require('express');
var app = express();

app.set('view engine', 'nhp');
app.use('/node_modules', express.static('node_modules'));
app.use(express.static('static'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/demos', function (req, res) {
    res.render('demos');
});

app.get('*', function (req, res) {
    res.render('404');
});

app.listen(8080, function () {
    console.log('Listening on port 8080');
});