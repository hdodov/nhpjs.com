var prod = process.env.NODE_ENV === 'production';
var port = process.env.PORT || 8080;

var express = require('express');
var app = express();

app.set('view engine', 'nhp');
app.use('/node_modules', express.static('node_modules'));
app.use(express.static('static'));

app.get('*', function (req, res, next) {
    if (prod && req.protocol === 'http')  {
        res.redirect('https://' + req.headers.host + req.url);
    } else {
        next();
    }
});

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/demos', function (req, res) {
    res.render('demos');
});

app.get('*', function (req, res) {
    res.render('404');
});

app.listen(port, function () {
    console.log(`Listening on port ${ port }`);
});